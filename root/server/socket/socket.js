const socketIO = require('socket.io')
const allowedOrigins = require('../config/allowedOrigins')
const Notification = require('../models/Notification')
const User = require('../models/User')
const mongoose = require('mongoose')

let io

const connectedSockets = {}

function initialize(server) {
    io = socketIO(server, {
        cors: {
            origin: allowedOrigins,
        },
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`)


        socket.on('connect_error', (err) => {
            console.log(`connect_error due to ${err.message}`)
        })


        socket.on('user_connected', (userId) => {
            console.log(`Connecting userId: ${userId}`)
            connectedSockets[userId] = socket.id
        })

        socket.on('initial_data', async (userId) => {
            const recipientId = new mongoose.Types.ObjectId(userId)
            const socketId = connectedSockets[userId]
            const notifications = await Notification.find({ recipient: recipientId }).sort({ createdAt: -1 });

            if (socketId && notifications) {
                io.to(socketId).emit('get_data', notifications)
            }
        })

        socket.on('check_notifications', async (userId) => {
            const recipientId = new mongoose.Types.ObjectId(userId)
            const socketId = connectedSockets[userId]
            const notifications = await Notification.find({ recipient: recipientId })
            //update read status once notifications are opened
            notifications.forEach((notification) => {
                notification.status = true
            })

            await Notification.create(notifications)

            if (socketId && notifications) {
                io.to(socketId).emit('change_data')
            }
        })

        socket.on('client_request', async (role, message) => {
            const manager_or_admin = await User.find({ roles: { $in: [role] } })
            for (const man_ad of manager_or_admin) {
                const recipient = man_ad._id
                await Notification.create({ recipient, message })
            }
            io.sockets.emit('change_data')
        })

        socket.on('delete_notification', async (notificationId) => {
            const notification = await Notification.findById(notificationId).exec()
            const result = await notification.deleteOne()
            console.log(result._id + ' deleted')
            io.sockets.emit('change_data')
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
            const userId = Object.keys(connectedSockets).find(
                (key) => connectedSockets[key] === socket.id
            )
            delete connectedSockets[userId]
        })

    });

}

function getIO() {
    if (!io) {
        throw new Error('Socket.io has not been initialized.')
    }
    return io
}

module.exports = {
    initialize,
    getIO,
    connectedSockets
}
const socketIO = require('socket.io');
const allowedOrigins = require('../config/allowedOrigins');
const Notification = require('../models/Notification')
const mongoose = require('mongoose')

let io;

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
            console.log('getting initial data for ' + userId)
            const recipientId = new mongoose.Types.ObjectId(userId)
            const socketId = connectedSockets[userId]
            const notifications = await Notification.find({ recipient: recipientId }).sort({ createdAt: -1 });

            if (socketId && notifications) {
                io.to(socketId).emit('get_data', notifications)
                console.log('intial data sent')
            } else {
                console.log('error sending initial data')
            }
        })

        socket.on('check_notifications', async (userId) => {
            console.log('checking notifications for ' + userId)
            const recipientId = new mongoose.Types.ObjectId(userId)
            const socketId = connectedSockets[userId]
            const notifications = await Notification.find({ recipient: recipientId })
            //update read status once notifications are opened
            notifications.forEach((notification) => {
                notification.status = true
            });

            await Notification.create(notifications)

            if (socketId && notifications) {
                io.to(socketId).emit('change_data')
                console.log('check notifications sent')
            } else {
                console.log('error checking notifications data')
            }

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
        throw new Error('Socket.io has not been initialized.');
    }
    return io;
}

module.exports = {
    initialize,
    getIO,
    connectedSockets
}
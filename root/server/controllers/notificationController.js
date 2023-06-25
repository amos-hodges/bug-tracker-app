const Notification = require('../models/Notification')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const { getIO, connectedSockets } = require('../socket/socket')

const io = getIO()

// @desc Create a new notification

const createNewNotification = async (recipient, message) => {

    const socketId = connectedSockets[recipient]

    const notification = await Notification.create({
        recipient,
        message,
    })

    if (socketId) {
        io.to(socketId).emit('change_data')
        console.log('change data sent')
    } else {
        console.log('error sending')
    }

    console.log('Successfully created notification:' + notification)

}

// @desc Ticket assignment notifications

const handleTicketAssigned = async (assignedUserId, ticketId) => {

    const ticket = await Ticket.findById(ticketId)
    const assignedUser = await User.findById(assignedUserId)
    //confirm data

    if (!ticket || !assignedUser) {
        console.log('Invalid ticket or user data recieved')
    }

    const message = `You have been assigned a new ticket: ${ticket.title}.`

    await createNewNotification(assignedUser._id, message)
}

// @desc Project assignment/removal notifications

const handleAddOrRemoveProject = async (assignedUserId, projectId, action) => {
    const assignedUser = await User.findById(assignedUserId)
    const project = await Project.findById(projectId)

    if (!assignedUser || !project) {
        console.log('Invalid project or user data recieved')
    }

    const message = `You have been ${action} the following project: ${project.title}.`
    await createNewNotification(assignedUser._id, message);
}


module.exports = {
    createNewNotification,
    handleTicketAssigned,
    handleAddOrRemoveProject
}

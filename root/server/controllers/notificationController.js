const Notification = require('../models/Notification')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const schedule = require('node-schedule')
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

// NEED TO SCHEDULE DIFFERENT JOBS FOR DIFFERENT ROLES
//PERIODICALLY CHECK FOR ALL USERS
const scheduleChecks = () => {
    schedule.scheduleJob('0 * * * *', async () => {
        try {
            await determineOverdue()
            console.log('Ticket status check completed.')
        } catch (error) {
            console.error('An error occurred during ticket status check:', error);
        }
    })
}

// *** EMPLOYEE NOTIFICATIONS ***

// @desc Ticket assignment notifications

const handleTicketAssigned = async (userId, ticketId) => {

    const ticket = await Ticket.findById(ticketId)
    const assignedUser = await User.findById(userId)
    //confirm data

    if (!ticket || !assignedUser) {
        console.log('Invalid ticket or user data recieved')
    }

    const message = `You have been assigned a new ticket: ${ticket.title}.`
    await createNewNotification(assignedUser._id, message)
}

// @desc Project assignment/removal notifications

const handleAddOrRemoveProject = async (userId, projectId, action) => {
    const assignedUser = await User.findById(userId)
    const project = await Project.findById(projectId)

    if (!assignedUser || !project) {
        console.log('Invalid project or user data recieved')
    }

    const message = `You have been ${action} the following project: ${project.title}.`
    await createNewNotification(assignedUser._id, message);
}

const determineOverdue = async (userId) => {

    const assignedTickets = await Ticket.find({ user: userId })

    const currentTime = new Date()
    //set to one day, change per requirements
    const timeLimit = 24 * 60 * 60 * 1000

    for (const ticket of assignedTickets) {
        const timeDifference = currentTime - ticket.createdAt

        if (timeDifference >= timeLimit) {
            const message = `The following ticket has been open for an extended period:\n ${ticket.title}.`
            await createNewNotification(userId, message)
        }
    }
}


module.exports = {
    createNewNotification,
    handleTicketAssigned,
    handleAddOrRemoveProject,
    scheduleChecks
}

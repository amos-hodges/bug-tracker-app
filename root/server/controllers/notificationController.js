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

const scheduleReminder = (userId, ticket) => {
    console.log('schedululing for user: ' + userId + ' ticket: ' + ticket.title)
    // Calculate the date and time one week from the ticket's createdAt timestamp
    const notificationDate = new Date(ticket.createdAt)
    //testing
    notificationDate.setSeconds(notificationDate.getSeconds() + 30)
    //notificationDate.setDate(notificationDate.getDate() + 7);
    const message = `The following ticket has been open for an extended time: \n ${ticket.title}`
    // Schedule a job to create a notification at the calculated date and time
    schedule.scheduleJob(notificationDate, async () => {
        try {
            // Create the notification for the ticket
            await createNewNotification(userId, message);
            console.log(`Reminder created.`);
        } catch (error) {
            console.error('Error creating reminder notification:', error);
        }
    });
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



module.exports = {
    createNewNotification,
    handleTicketAssigned,
    handleAddOrRemoveProject,
    scheduleReminder
}

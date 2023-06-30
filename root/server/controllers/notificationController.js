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
    //const notification =
    await Notification.create({
        recipient,
        message,
    })
    //console.log(notification)
    if (socketId) {
        io.to(socketId).emit('change_data')
        console.log('change data sent')
    } else {
        console.log('socket not currently connected for userId: ' + recipient)
    }
    console.log('Successfully created notification: ' + message)
}




// *** EMPLOYEE SPECIFIC NOTIFICATIONS ***


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
    //confirm data
    if (!assignedUser || !project) {
        console.log('Invalid project or user data recieved')
    }
    const message = `You have been ${action} the following project: ${project.title}.`
    await createNewNotification(assignedUser._id, message)
}

// @desc Reminder 1 day before ticket due date
const scheduleDueDateReminder = (userId, ticket, dueDate) => {
    const notificationDate = new Date(dueDate)
    //remind user 1 day before due date
    notificationDate.setDate(notificationDate.getDate() - 1)
    const message = `The following ticket is due is 24 hours: ${ticket.title}.`
    // Schedule a job to create a notification at the calculated date and time
    schedule.scheduleJob(notificationDate, async () => {
        try {
            // Create the notification for the ticket
            await createNewNotification(userId, message)
            console.log(`Reminder created for ${notificationDate}.`)
        } catch (error) {
            console.error('Error creating reminder notification:', error)
        }
    })
}


// *** MANAGER & ADMIN SPECIFIC NOTIFICATIONS ***


// @desc Notify managers of backlog/late/urgent tickets

const handleCriticalNotification = async (ticket, userId) => {
    const user = await User.findById(userId)
    const managers = await User.find({ roles: { $in: ['Manager'] } })
    const message = `${user.username} was assigned a ticket with critical importance: ${ticket.title}`
    for (const manager of managers) {
        const reciepient = manager._id
        await createNewNotification(reciepient, message)
    }

}

// @desc Addition/Modification/Removal of employees

const handleEmployeeUpdate = async (message, role) => {

    const toNotify = await User.find({ roles: { $in: [role] } })

    for (const manager_or_admin of toNotify) {
        const recipient = manager_or_admin._id
        await createNewNotification(recipient, message)
    }
}

module.exports = {
    createNewNotification,
    handleTicketAssigned,
    handleAddOrRemoveProject,
    scheduleDueDateReminder,
    handleEmployeeUpdate,
    handleCriticalNotification
}

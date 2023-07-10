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

    await Notification.create({
        recipient,
        message,
    })

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

// *** EMPLOYEE & MANAGER NOTIFICATIONS ***

// @desc Remind User 1 day before ticket due date - Notify manager if not complete by due date
const scheduleDueDateNotifications = async (userId, ticket, dueDate) => {
    const user = await User.findById(userId)
    const managers = await User.find({ roles: { $in: ['Manager'] } })

    const reminderDate = new Date(dueDate)
    const lateDate = new Date(dueDate)

    //remind user 1 day before due date
    reminderDate.setDate(reminderDate.getDate() - 1)

    //notify manager 1 min after due date
    lateDate.setSeconds(lateDate.getSeconds() + 60)

    const reminderMessage = `The following ticket is due is 24 hours: ${ticket.title}.`
    const lateMessage = `${user.username} did not complete the following ticket by the due date (${dueDate}): ${ticket.title}.`

    // Schedule a job to create notifications at the calculated times
    schedule.scheduleJob(reminderDate, async () => {
        try {
            // Create the notification for the ticket
            await createNewNotification(userId, reminderMessage)
            console.log(`Reminder created for ${reminderDate}.`)
        } catch (error) {
            console.error('Error creating reminder notification:', error)
        }
    })

    schedule.scheduleJob(lateDate, async () => {
        try {
            if (!ticket.completed) {
                for (const manager of managers) {
                    const reciepient = manager._id
                    await createNewNotification(reciepient, lateMessage)
                }
                console.log(`Managers notified of late ticket on ${lateDate}.`)
            }
        } catch (error) {
            console.error('Error creating reminder notification:', error)
        }
    })
}


// *** MANAGER & ADMIN SPECIFIC NOTIFICATIONS ***


// @desc Notify managers of critical tickets

const handleCriticalNotification = async (ticket, userId) => {
    const user = await User.findById(userId)
    const managers = await User.find({ roles: { $in: ['Manager'] } })
    const message = `${user.username} was assigned a ticket with critical importance: ${ticket.title}`
    for (const manager of managers) {
        const recipient = manager._id
        await createNewNotification(recipient, message)
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
    scheduleDueDateNotifications,
    handleEmployeeUpdate,
    handleCriticalNotification,
}

const Notification = require('../models/Notification')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const { getIO, connectedSockets } = require('../socket/socket')


// @desc Get all notifications
// @route GET /notifications
// @access Private

const io = getIO()

// io.on('initial_data', async ({ userId }) => {
//     console.log('getting initial data for ' + userId)
//     const socketId = connectedSockets[userId]
//     const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

//     if (socketId && notifications) {
//         io.to(socketId).emit('get_data', notifications);
//     } else {
//         console.log('error sending initial data')
//     }
// })

// io.on('check_notifications', async ({ userId }) => {
//     console.log('checking notifications for ' + userId)
//     const socketId = connectedSockets[userId]
//     const notifications = await Notification.find({ userId })

//     notifications.forEach((notification) => {
//         notification.status = true
//     });

//     await Notification.create(notifications)

//     if (socketId && notifications) {
//         io.to(socketId).emit('change_data')
//     } else {
//         console.log('error checking notifications data')
//     }

// })


const emitNotifications = (userId, notifications) => {
    const socketId = connectedSockets[userId];
    if (socketId) {
        io.to(socketId).emit('get_data', notifications);
    } else {
        console.log('error sending')
    }
}

const getUserNotifications = async (req, res) => {

    const notifications = await Notification.find({ recipient: req.user._id })

    if (!notifications?.length) {
        return res.status(400).json({ message: 'No notifications found' })
    }

    res.json(notifications)
}


// @desc Create a new notification
// @route POST /notifications
// @access Private


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
    // io.emit('notification', notification)
    console.log('Successfully created notification')
    //io.emit('change_data')
    // emitNotifications(recipient, [notification])
}


// @desc Update a notification
// @route PATCH /notifications
// @access Private


const updateNotification = async (req, res) => {
    const { id } = req.body

    const notification = await Notification.findById(id)
    //confirm data
    if (!notification) {
        return res.status(404).json({ message: 'Notification not found' })
    }

    // Update the status property to true
    notification.status = true;

    // Save the updated notification
    const updatedNotification = await notification.save()

    res.json({ message: `Notification: '${updatedNotification.message}'. Status updated successfully` })

}


// @desc Delete a notification
// @route DELETE /notifications
// @access Private


const deleteNotification = async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Notification ID required' })
    }

    //confirm notification exists
    const notification = await Notification.findById(id).exec()

    if (!notification) {
        return res.status(400).json({ message: 'Notification not found' })
    }
    // Check if the notification has been read
    // if (!notification.status) {
    //     return res.status(403).json({ message: 'Cannot delete an unread notification' });
    // }
    const result = await notification.deleteOne()

    const reply = `Notification: '${result.message}', with ID ${result._id} deleted`

    res.json(reply)
}


const handleTicketAssigned = async (assignedUserId, ticketId) => {


    const ticket = await Ticket.findById(ticketId)
    const assignedUser = await User.findById(assignedUserId)
    //confirm data
    if (!ticket || !assignedUser) {
        console.log('Invalid ticket or user data recieved')
        // return res.status(400).json({ message: 'Invalid ticket or user data' })
    }


    const message = `You have been assigned a new ticket: ${ticket.title}.`


    await createNewNotification(assignedUser._id, message)
}


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
    getUserNotifications,
    createNewNotification,
    updateNotification,
    deleteNotification,
    handleTicketAssigned,
    handleAddOrRemoveProject
}

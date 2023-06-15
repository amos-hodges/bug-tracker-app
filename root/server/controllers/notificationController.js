const Notification = require('../models/Notification')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')

// @desc Get all notifications
// @route GET /notifications
// @access Private

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

    const notification = await Notification.create({
        recipient,
        message,
    })

    // if (notification) {
    //     return res.status(201).json({ message: 'Notification succesfuly created' })
    // } else {
    //     return res.status(400).json({ message: 'Invalid notification data recieved' })
    // }
}

// @desc Update a notification
// @route PATCH /notifications
// @access Private

const updateNotification = async (req, res) => {
    const { id } = req.body

    const notification = await Notification.findById(id);
    //confirm data
    if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
    }

    // Update the status property to true
    notification.status = true;

    // Save the updated notification
    const updatedNotification = await notification.save();

    res.json({ message: `Notification: '${updatedNotification.message}'. Status updated successfully` });

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
    if (!notification.status) {
        return res.status(403).json({ message: 'Cannot delete an unread notification' });
    }
    const result = await notification.deleteOne()

    const reply = `Notification: '${result.message}', with ID ${result._id} deleted`

    res.json(reply)
}

const handleTicketAssigned = async (assignedUserId, ticketId) => {

    const ticket = await Ticket.findById(ticketId);
    const assignedUser = await User.findById(assignedUserId);
    //confirm data
    if (!ticket || !assignedUser) {
        return res.status(400).json({ message: 'Invalid ticket or user data' })
    }

    const message = `You have been assigned a new ticket: ${ticket.title}.`

    await createNewNotification(assignedUser._id, message)
}

module.exports = {
    getUserNotifications,
    createNewNotification,
    updateNotification,
    deleteNotification,
    handleTicketAssigned
}
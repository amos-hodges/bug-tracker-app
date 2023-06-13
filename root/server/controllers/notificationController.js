const Notification = require('../models/Notification')
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')

// @desc Get all notifications
// @route GET /notifications
// @access Private

const getUserNotifications = async (req, res) => {
    console.log(req.user._id)
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
    const { id } = req.params;

    // Update the notification based on the provided ID and request body
    await Notification.findByIdAndUpdate(id, req.body);

    res.json({ message: 'Notification updated successfully' })
}

// @desc Delete a notification
// @route DELETE /notifications
// @access Private

const deleteNotification = async (req, res) => {
    const { id } = req.params;

    // Delete the notification based on the provided ID
    await Notification.findByIdAndDelete(id);

    res.json({ message: 'Notification deleted successfully' })
}

const handleTicketAssigned = async (assignedUserId, ticketId) => {

    const ticket = await Ticket.findById(ticketId);
    const assignedUser = await User.findById(assignedUserId);
    console.log(ticket, assignedUser)
    if (!ticket || !assignedUser) {
        console.log('not found')
        // Ticket or assigned user not found, handle the error accordingly
        return;
    }

    const message = `You have been assigned to ticket ${ticket.title}.`;
    await createNewNotification(assignedUser._id, message);


}

module.exports = {
    getUserNotifications,
    createNewNotification,
    updateNotification,
    deleteNotification,
    handleTicketAssigned
}
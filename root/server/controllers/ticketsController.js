const User = require('../models/User')
const Ticket = require('../models/Ticket')
const asyncHandler = require('express-async-handler')

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async (req, res) => {

    const tickets = await Ticket.find().lean()
    if (!tickets?.length) {
        return res.status(400).json({ message: 'No tickets found' })
    }

    const ticketsWithUser = await Promises.all(tickets.map(async (ticket) => {
        const user = await User.findById(ticket.user).lean().exec()
        return { ...ticket, username: user.username }
    }))
    res.json(ticketsWithUser)
})

// @desc Create a new ticket
// @route POST /tickets
// @access Private
const createNewTicket = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    //confrim data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //check duplicates
    const duplicate = await Ticket.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate ticket title' })
    }

    const ticket = await Ticket.create({ user, title, text })

    if (ticket) {
        return res.status(201).json({ message: 'Ticket succesfuly created' })
    } else {
        return res.status(400).json({ message: 'Invalid ticket data recieved' })
    }

})

// @desc Update a ticket
// @route PATCH /tickets
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    //confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All field are required' })
    }
    //confirm ticket exists
    const ticket = await Ticket.findById(id).exec()

    if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
    }
    //check duplicates
    const duplicate = await Ticket.findOne({ title }).lean().exec()
    // allow original ticket to be renamed
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate ticket found' })
    }

    ticket.user = user
    ticket.title = title
    ticket.text = text
    ticket.completed = completed

    const updatedTicket = await ticket.save()

    res.json(`${updatedTicket.title} updated`)


})

// @desc Get all tickets
// @route GET /tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {

    //may want to add completed to ensure open tickets are not deleted
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Ticket ID required' })
    }
    //confirm ticket exists
    const ticket = await Ticket.findById(id).exec()

    if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
    }

    const result = await Ticket.deleteOne()

    const reply = `Ticket ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllTickets,
    createNewTicket,
    updateTicket,
    deleteTicket

}
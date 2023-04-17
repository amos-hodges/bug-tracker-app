const User = require('../models/User')
const Ticket = require('../models/Ticket')
const asyncHandler = require('express-async-handler')

// @desc Get all tickets
// @route GET /tickets
// @access Private
const getAllTickets = asyncHandler(async (res, req) => {

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
const createNewTickets = asyncHandler(async (res, req) => {

})

// @desc Update a ticket
// @route PATCH /tickets
// @access Private
const updateTicket = asyncHandler(async (res, req) => {

})

// @desc Get all tickets
// @route GET /tickets
// @access Private
const deleteTicket = asyncHandler(async (res, req) => {

})
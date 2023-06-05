const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')

// @desc Get all tickets
// @route GET /tickets
// @access Private

//Would want to do project id filtering here if dealing with a larger number of tickets
const getAllTickets = async (req, res) => {

    const tickets = await Ticket.find().lean()
    if (!tickets?.length) {
        return res.status(400).json({ message: 'No tickets found' })
    }

    const ticketsWithUserAndProject = await Promise.all(tickets.map(async (ticket) => {
        const user = await User.findById(ticket.user).lean().exec()
        const project = await Project.findById(ticket.project).lean().exec()
        return { ...ticket, username: user.username, projectTitle: project.title }
    }))
    res.json(ticketsWithUserAndProject)
}

// @desc Create a new ticket
// @route POST /tickets
// @access Private
const createNewTicket = async (req, res) => {

    const { user, project, title, text, importance } = req.body
    console.log(req.body)
    //confrim data

    if (!user || !project || !title || !text || !importance) {
        console.log(user, project, title, text, importance)
        return res.status(400).json({ message: 'All fields are required.' })
    }

    //check duplicates
    const duplicate = await Ticket.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate ticket title' })
    }

    const ticket = await Ticket.create({ user, project, title, text, importance })

    if (ticket) {
        return res.status(201).json({ message: 'Ticket succesfuly created' })
    } else {
        return res.status(400).json({ message: 'Invalid ticket data recieved' })
    }

}

// @desc Update a ticket
// @route PATCH /tickets
// @access Private
const updateTicket = async (req, res) => {
    const { id, user, title, text, completed, importance } = req.body
    console.log(`${id} updated`)
    //confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean' || !importance) {
        console.log(id, user, title, text, typeof completed)
        return res.status(400).json({ message: 'All field are required' })
    }
    //confirm ticket exists
    const ticket = await Ticket.findById(id).exec()

    if (!ticket) {
        return res.status(400).json({ message: 'Ticket not found' })
    }
    //check duplicates
    const duplicate = await Ticket.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()
    // allow original ticket to be renamed
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate ticket found' })
    }

    ticket.user = user
    ticket.title = title
    ticket.text = text
    ticket.completed = completed
    ticket.importance = importance

    const updatedTicket = await ticket.save()

    res.json(`${updatedTicket.title} updated`)


}

// @desc Delete a ticket
// @route DELETE /tickets
// @access Private
const deleteTicket = async (req, res) => {

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
    // Check if the ticket is completed
    if (!ticket.completed) {
        return res.status(403).json({ message: 'Cannot delete an incomplete ticket' });
    }
    const result = await ticket.deleteOne()

    const reply = `Ticket ${result.title} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllTickets,
    createNewTicket,
    updateTicket,
    deleteTicket
}
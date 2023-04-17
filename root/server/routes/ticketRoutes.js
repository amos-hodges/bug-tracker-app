const express = require('express')
const router = express.Router()
const ticketsController = require('../controllers/ticketController')

router.route('/')
    //same as chaining
    .get(ticketsController.getAllTickets)
    .post(ticketsController.createNewTicket)
    .patch(ticketsController.updateTicket)
    .delete(ticketsController.deleteTicket)

module.exports = router
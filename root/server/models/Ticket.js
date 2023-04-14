const mongoose = require('mongoose')
const AutoIncrement = require('mongoos-sequence')(mongoose)

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
},
    {
        timestamps: true
    }
)


ticketSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 0
})

module.exports = mongoose.model('Ticket', ticketSchema)
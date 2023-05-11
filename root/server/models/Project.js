const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }]

    }
)

module.exports = mongoose.model('Project', projectSchema)
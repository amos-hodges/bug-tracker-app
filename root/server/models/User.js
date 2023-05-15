const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["Employee"]
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    active: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('User', userSchema)
const socketIO = require('socket.io');
const allowedOrigins = require('../config/allowedOrigins');

let io;

function initialize(server) {
    io = socketIO(server, {
        cors: {
            origin: allowedOrigins,
        },
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
    });

    io.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
}

function getIO() {
    if (!io) {
        throw new Error('Socket.io has not been initialized.');
    }
    return io;
}

module.exports = {
    initialize,
    getIO,
}
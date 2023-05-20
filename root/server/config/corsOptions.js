const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        //checks if recieved origin is in allowed origins or if it exsists
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            //(error, allowed)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions
const rateLimit = require('express-rate-limiter')
const { logEvents } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // one minute
    max: 5, // limit each IP to 5 login requests per 'window' per minute
    message: { message: 'Too many login attempts from this IP, try again in 60 seconds' },
    handler: (req, res, next, option) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, errLog.log)
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, //return rate limit info on the 'RateLimit-*' headers
    legacyHeaders: false, // disable 'X-RateLimit-*' headers
})

module.exports = loginLimiter
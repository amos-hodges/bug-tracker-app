const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    //same as chaining
    .get(notificationController.getUserNotifications)
    .post(notificationController.createNewNotification)
    .patch(notificationController.updateNotification)
    .delete(notificationController.deleteNotification)

module.exports = router
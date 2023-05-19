const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    //same as chaining
    .get(projectController.getAllProjects)
    .post(projectController.createNewProject)
    .patch(projectController.updateProject)
    .delete(projectController.deleteProject)

module.exports = router
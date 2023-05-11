const Project = require('../models/Project')
const Ticket = require('../models/Ticket')
const User = require('../models/User')

// @desc Get all projects
// @route GET /projects
// @access Private
const getAllProjects = async (req, res) => { }

// @desc Create a new project
// @route POST /projects
// @access Private
const createNewProject = async (req, res) => { }

// @desc Update a project
// @route PATCH /projects
// @access Private
const updateProject = async (req, res) => { }

// @desc Delete a project
// @route DELETE /projects
// @access Private
const deleteProject = async (req, res) => { }

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject
}
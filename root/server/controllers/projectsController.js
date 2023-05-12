const Project = require('../models/Project')
const Ticket = require('../models/Ticket')
const User = require('../models/User')

// @desc Get all projects
// @route GET /projects
// @access Private

const getAllProjects = async (req, res) => {

    const projects = await Project.find().lean()

    if (!projects?.length) {
        return res.status(400).json({ message: 'No projects found' })
    }

    const projectsWithUsersAndTickets = await Promise.all(
        projects.map(async (project) => {
            const populatedProject = await Project.populate(project, [
                { path: 'tickets', model: Ticket },
                { path: 'users', model: User }
            ])
            return populatedProject
        })
    )
    res.json(populatedProject)
}

// @desc Create a new project
// @route POST /projects
// @access Private
const createNewProject = async (req, res) => {
    const { title, description, users } = req.body

    if (!title || !description) {
        return res.status(400).json({ message: 'Title field is required' })
    }

    //check duplicates
    const duplicate = await Ticket.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate project title' })
    }
    //project can be created with or without users assigned
    const project = await Project.create({
        title,
        users: users || [],
        tickets: [],
    });

    if (project) {
        return res.status(201).json({ message: 'Project succesfuly created' })
    } else {
        return res.status(400).json({ message: 'Invalid project data recieved' })
    }

}

// @desc Update a project
// @route PATCH /projects
// @access Private
const updateProject = async (req, res) => {
    //need to be able to update title, description
    //need to be able to add and remove users 

}

// @desc Delete a project
// @route DELETE /projects
// @access Private
const deleteProject = async (req, res) => {
    //needs to make sure no open tickets before delete
}

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject
}
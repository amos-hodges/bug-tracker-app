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
    res.json(projects)

}

// @desc Create a new project
// @route POST /projects
// @access Private
const createNewProject = async (req, res) => {
    const { title, description } = req.body

    if (!title || !description) {
        return res.status(400).json({ message: 'All fields required' })
    }

    //check duplicates
    const duplicate = await Project.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate project title' })
    }
    //project can be created with or without users assigned
    const project = await Project.create({ title, description });

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
    const { id, title, description } = req.body

    if (!id || !title || !description) {
        return res.status(400).json({ message: 'All field are required' })
    }

    const project = await Project.findById(id).exec()

    if (!project) {
        return res.status(400).json({ message: 'Project not found' })
    }
    const duplicate = await Project.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate project title' })
    }

    project.title = title
    project.description = description

    const updatedProject = await project.save()

    res.json(`Project: ${updatedProject.title} updated succesfully`)
}

// @desc Delete a project
// @route DELETE /projects
// @access Private
const deleteProject = async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Project ID required' })
    }
    //confirm project exists
    const project = await Project.findById(id).exec()

    if (!project) {
        return res.status(400).json({ message: 'Project not found' })
    }

    const result = await project.deleteOne()

    const reply = `Project ${result.title} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject
}
const User = require('../models/User')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const { handleAddOrRemoveProject, handleEmployeeUpdate } = require('./notificationController')
const bcrypt = require('bcrypt')


// @desc Get all user
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {

    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    const usersWithProjects = await Promise.all(users.map(async (user) => {
        //retrieve project titles only
        const projectTitles = await Project.find(
            { _id: { $in: user.projects } },
            'title'
        ).lean();
        return { ...user, projectTitles: projectTitles.map((project) => project.title) };
    }))

    res.json(usersWithProjects)
}


// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, roles } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    //check for duplicate
    //collation - fix for case sensitivity. duplicate will be found regardless of case
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    //hash password
    const hashedPwd = await bcrypt.hash(password, 10) //salt round

    // const userObject = { username, 'password': hashedPwd, roles }
    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

    //create and store new user
    const user = await User.create(userObject)
    handleEmployeeUpdate(`${username} has just been added to the team!`, 'Manager')
    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data recieved' })
    }
}


// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const { id, username, roles, active, password, projects } = req.body
    //confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    //check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    // allow for updates to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    let message = ''

    if (user.username !== username) {
        message += `Username change from ${user.username} to ${username}.`
    }
    if (user.active !== active) {
        if (message) {
            message += ' & '
        }
        message += `Account active status changed to ${active}.`
    }

    user.username = username
    user.roles = roles
    user.active = active

    // Notifications for updates to user's projects
    if (projects && Array.isArray(projects)) {
        const previousProjects = user.projects || []
        const newProjects = projects.filter((projectId) => !previousProjects.includes(projectId))
        const removedProjects = previousProjects.filter((projectId) => !projects.includes(projectId.toString()))
        //for newly assigned projects
        for (const projectId of newProjects) {
            const action = 'assigned to';
            await handleAddOrRemoveProject(id, projectId, action);
        }
        //for removed projects
        for (const projectId of removedProjects) {
            const action = 'removed from'
            await handleAddOrRemoveProject(id, projectId.toString(), action)
        }
        user.projects = projects
    }

    //dont want to require pwd change
    if (password) {
        //hash password
        user.password = await bcrypt.hash(password, 10)

        handleEmployeeUpdate(`${user.username}'s password was just changed.`, 'Admin')
    }
    const updatedUser = await user.save()
    if (message) {
        handleEmployeeUpdate(`The following updates were performed on ${username}'s account: ${message}`, 'Manager')
    }

    res.json({ message: `${updatedUser.username} updated` })
}


// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body


    if (!id) {
        return res.status(400).json({ message: 'User ID required' })
    }
    // do not want to delete any users with active tickets
    const tickets = await Ticket.findOne({ user: id }).lean().exec()
    if (tickets?.length) {
        return res.status(400).json({ message: 'User has active tickets' })
    }

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    handleEmployeeUpdate(`${user.username} was just removed from the team.`, 'Manager')

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}

import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'
import Modal from '../../components/Modal'
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user, projects, tickets }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSucces,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const { isAdmin, isManager } = useAuth()
    const isOnlyManager = (isManager && !isAdmin)
    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [userProjects, setUserProjects] = useState(user.projects)
    const [active, setActive] = useState(user.active)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess || isDelSucces) {
            setUsername('')
            setPassword('')
            setRoles([])
            setUserProjects([])
            navigate('/dashboard/users')
        }
    }, [isSuccess, isDelSucces, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const toggleRole = (role) => {
        if (roles.includes(role)) {
            setRoles([])
        } else {
            setRoles([role])
        }
    }

    const toggleProject = (projectId) => {
        const hasTickets = tickets.some((ticket) => ticket.project === projectId)

        if (hasTickets) {
            setShowModal(true)
        } else {
            if (userProjects.includes(projectId)) {
                setUserProjects(userProjects.filter((id) => id !== projectId))
            } else {
                setUserProjects([...userProjects, projectId])
            }
        }
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, projects: userProjects, active })
        } else {
            await updateUser({ id: user.id, username, roles, projects: userProjects, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const handleBackClick = () => {
        navigate('/dashboard/users')
    }

    const options = Object.values(ROLES).map((role) => (
        <label key={role} className="checkbox-label">
            <input
                type="checkbox"
                value={role}
                checked={role === roles[0]}
                onChange={() => toggleRole(role)}
            />{' '}
            {role}
        </label>
    ))

    const projectOptions = projects.map((project) => (
        <label key={project.id} className="checkbox-label">
            <input
                type="checkbox"
                value={project.id}
                checked={userProjects.includes(project.id)}
                onChange={() => toggleProject(project.id)}
            />{' '}
            {project.title}
        </label>
    ))

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const noTickets = !tickets.length ? true : false

    let deleteButton
    if (noTickets && isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteUserClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            User Settings
        </button>
    )


    const content = (
        <>
            {backButton}
            <div className="page-container">
                <p className={errClass}>{errContent}</p>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    {isOnlyManager && <h1>{username}</h1>}
                    <div className="form__title-row">

                        <h2>Edit User {isOnlyManager && 'Projects'}</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveUserClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            {deleteButton}
                        </div>
                    </div>

                    {isAdmin && (
                        <>
                            <label className="form__label" htmlFor="username">
                                Username: <span className="nowrap">[3-20 letter]</span>
                            </label>
                            <input
                                className={`form__input ${validUserClass}`}
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                value={username}
                                onChange={onUsernameChanged}
                            />
                            <label className="form__label" htmlFor="password">
                                Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                            <input
                                className={`form__input ${validPwdClass}`}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />

                            <label className="form__label form__checkbox-container" htmlFor="user-active">
                                ACTIVE:
                                <input
                                    className="form__checkbox"
                                    id="user-active"
                                    name="user-active"
                                    type="checkbox"
                                    checked={active}
                                    onChange={onActiveChanged}
                                />
                            </label>

                            <label className="form__label" htmlFor="roles">
                                ASSIGNED ROLES:
                            </label>
                            <div className="form__options">
                                {options}
                            </div>

                        </>)}
                    <label className="form__label" htmlFor="projects">
                        ASSIGNED PROJECTS:
                    </label>
                    <div className="form__options drop-down">
                        {projectOptions}
                    </div>


                </form>
            </div>
            {showModal && (
                <Modal
                    className={"modal"}
                    timeOut={3000}
                    onClose={() => setShowModal(false)}>
                    <p>User has tickets open in that project!</p>
                </Modal>)}
        </>
    )


    return content

}

export default EditUserForm
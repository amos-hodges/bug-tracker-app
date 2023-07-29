import { useState, useEffect } from 'react'
import { useUpdateProjectMutation, useDeleteProjectMutation } from './projectsApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

const EditProjectForm = ({ project, tickets, users }) => {
    const { isAdmin } = useAuth()

    const [updateProject, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateProjectMutation()

    const [deleteProject, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteProjectMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(project.title)
    const [description, setDescription] = useState(project.description)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setDescription('')
            navigate('/dashboard')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [title, description].every(Boolean) && !isLoading

    const onSaveProjectClicked = async (e) => {
        if (canSave) {
            await updateProject({ id: project.id, title, description })
        }
    }

    const onDeleteProjectClicked = async () => {
        await deleteProject({ id: project.id })
    }

    const handleBackClick = () => {
        navigate('/dashboard')
    }

    const created = new Date(project.createdAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })
    const updated = new Date(project.updatedAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const associatedUsers = users.some(user => user.projects.includes(project.id))

    let deleteButton = null
    if (!tickets?.length && !associatedUsers && isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteProjectClicked}
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
            Back to Projects
        </button>
    )


    const content = (
        <>
            {backButton}
            <div className="page-container">
                <p className={errClass}>{errContent}</p>

                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form__title-row">
                        <h2>Edit "{project.title}"</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={onSaveProjectClicked}
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                            {deleteButton}
                        </div>
                    </div>
                    <label className="form__label" htmlFor="note-title">
                        Title:</label>
                    <input
                        className={`form__input ${validTitleClass}`}
                        id="note-title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />

                    <label className="form__label" htmlFor="note-text">
                        Project Description:</label>
                    <textarea
                        className={`form__input form__input--text ${validDescriptionClass}`}
                        id="note-text"
                        name="text"
                        value={description}
                        onChange={onDescriptionChanged}
                    />

                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>

                </form>
            </div>
        </>
    )

    return content
}

export default EditProjectForm
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewProjectMutation } from './projectsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewProjectForm = () => {

    const [addNewProject, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProjectMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setDescription('')
            navigate('/dashboard/projects')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const canSave = [title, description].every(Boolean) && !isLoading

    const onSaveProjectClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewProject({ title, description })
        }
    }

    const handleBackClick = () => {
        navigate('/dashboard')
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            Back to Projects
        </button>
    )


    const content = (
        <>
            {backButton}
            <div className="page-container">
                <p className={errClass}>{error?.data?.message}</p>

                <form className="form" onSubmit={onSaveProjectClicked}>
                    <div className="form__title-row">
                        <h2>Create New Project</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </div>
                    <label className="form__label" htmlFor="title">
                        Title:</label>
                    <input
                        className={`form__input ${validTitleClass}`}
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />

                    <label className="form__label" htmlFor="text">
                        Project Description:</label>
                    <textarea
                        className={`form__input form__input--text ${validDescriptionClass}`}
                        id="text"
                        name="text"
                        value={description}
                        onChange={onDescriptionChanged}
                    />
                </form>
            </div>
        </>
    )

    return content
}

export default NewProjectForm
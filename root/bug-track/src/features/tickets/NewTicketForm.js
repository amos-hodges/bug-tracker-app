import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddNewTicketMutation } from './ticketsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { STATUS } from '../../config/statuses'
//ADD A BUTTON TO DIRECTLY ADD A NEW USER TO THE PROJECT
const NewTicketForm = ({ users }) => {

    const { projectId } = useParams()
    //console.log(projectId)
    const [addNewTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTicketMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [importance, setImportance] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {

            setTitle('')
            setText('')
            setImportance('')
            setUserId('')
            navigate(`/dashboard/projects/${projectId}/tickets`)
        }
    }, [isSuccess, navigate, projectId])


    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onImportanceChanged = e => setImportance(e.target.value)

    const canSave = [projectId, title, text, importance, userId].every(Boolean) && !isLoading

    const onSaveTicketClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTicket({ user: userId, project: projectId, title, text, importance })
        }
    }

    const options = users
        .filter(user => user.projects.includes(projectId))
        .map(user => (
            <option key={user.id} value={user.id}>
                {user.username}
            </option>
        ))

    const statusOptions = Object.keys(STATUS).map((statusKey) => (
        <option key={statusKey} value={statusKey}>
            {STATUS[statusKey]}
        </option>
    ))

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveTicketClicked}>
                <div className="form__title-row">
                    <h2>New Ticket</h2>
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
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

                <label className="form__label form__checkbox-container" htmlFor="importance">
                    IMPORTANCE:</label>
                <select
                    id="importance"
                    name="importance"
                    className="form__select"
                    value={importance}
                    onChange={onImportanceChanged}
                >
                    {statusOptions}
                </select>

            </form>
        </>
    )

    return content
}

export default NewTicketForm
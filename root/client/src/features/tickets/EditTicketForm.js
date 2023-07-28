import { useState, useEffect } from 'react'
import { useUpdateTicketMutation, useDeleteTicketMutation } from './ticketsApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan, faCommentMedical } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import { STATUS } from '../../config/statuses'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditTicketForm = ({ ticket, users }) => {
    const { userId: currentUser, isManager, isAdmin } = useAuth()

    const { projectId } = useParams()

    const noProject = (projectId === 'all')

    const [updateTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTicketMutation()

    const [deleteTicket, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteTicketMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(ticket.title)
    const [text, setText] = useState(ticket.text)
    const [importance, setImportance] = useState(ticket.importance)
    const [completed, setCompleted] = useState(ticket.completed)
    const [userId, setUserId] = useState(ticket.user)
    const [dueDate, setDueDate] = useState(new Date(ticket.dueDate))

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setImportance('')
            setUserId('')
            navigate(`/dashboard/projects/${projectId}/tickets`)
        }
    }, [isSuccess, isDelSuccess, navigate, projectId])

    const canSave = [title, text, importance, userId, dueDate].every(Boolean) && !isLoading
    const canDelete = (isManager || isAdmin) && ticket.completed
    const displayEdit = !noProject && (isAdmin || isManager)

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onImportanceChanged = e => setImportance(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onDueDateChanged = date => setDueDate(date)

    const handleExtensionRequest = () => {
        navigate(`/dashboard/projects/${projectId}/tickets/${ticket.id}/extension`)
    }

    const onNewNoteClicked = () => {
        //add a note once ticket model has been updated to accomodate
        console.log('adding new note')
    }

    const handleBackClick = () => {
        navigate(`/dashboard/projects/${projectId}/tickets`)
    }

    const onSaveTicketClicked = async (e) => {
        await updateTicket({ id: ticket.id, user: userId, title, text, importance, completed, dueDate })
    }

    const onDeleteTicketClicked = async () => {
        await deleteTicket({ id: ticket.id })
    }


    const created = new Date(ticket.createdAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })

    const dueOn = new Date(ticket.dueDate).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })


    const options = [
        <option key="" value="">
            -- Select User --
        </option>,
        ...users
            .filter(user => user.projects.includes(projectId))
            .map(user => (
                <option key={user.id} value={user.id}>
                    {user.username}
                </option>
            ))
    ]

    const statusOptions = [
        <option key="" value="">
            -- Select Status --
        </option>,
        ...Object.keys(STATUS).map((statusKey) => (
            <option key={statusKey} value={statusKey}>
                {STATUS[statusKey]}
            </option>
        ))
    ]

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ""
    const validTextClass = !text ? "form__input--incomplete" : ""

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            Back
        </button>
    )

    let extensionRequestButton = (
        <button
            className="button-18"
            onClick={handleExtensionRequest}
        >
            Request Extension
        </button>
    )

    let deleteButton = (
        <button
            className="icon-button"
            title="Delete"
            onClick={onDeleteTicketClicked}
            disabled={!canDelete}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    let noteButton = (
        <button
            className="icon-button"
            title="NewNote"
            onClick={onNewNoteClicked}
        >
            <FontAwesomeIcon icon={faCommentMedical} />
        </button>
    )

    let saveButton = (
        <button
            className="icon-button"
            title="Save"
            onClick={onSaveTicketClicked}
            disabled={!canSave}
        >
            <FontAwesomeIcon icon={faSave} />
        </button>
    )

    const content = (
        <>
            {backButton}
            <div className="page-container">
                <p className={errClass}>{errContent}</p>
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form__title-row">
                        <h2>Edit Ticket</h2>
                        <div className="form__action-buttons">
                            {noteButton}
                            {saveButton}
                            {deleteButton}
                        </div>
                    </div>

                    <label className="form__label" htmlFor="note-title">
                        Title:</label>
                    {displayEdit
                        ? <input
                            className={`form__input ${validTitleClass}`}
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />
                        : <p>{ticket.title}</p>}

                    <label className="form__label" htmlFor="note-text">
                        Description:</label>
                    {displayEdit
                        ? < textarea
                            className={`form__input form__input--text ${validTextClass}`}
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />
                        : <p>{ticket.text}</p>}

                    <div className="form__row">
                        <div className="form__divider">

                            <label className="form__label form__checkbox-container" htmlFor="note-completed">
                                WORK COMPLETE:
                            </label>
                            {(currentUser === userId)
                                ? <input
                                    className="form__checkbox"
                                    id="note-completed"
                                    name="completed"
                                    type="checkbox"
                                    checked={completed}
                                    onChange={onCompletedChanged}
                                />
                                : <p>{completed ? 'Yes' : 'No'}</p>}

                            <label className="form__label form__checkbox-container" htmlFor="note-username">
                                ASSIGNED TO:</label>
                            {displayEdit
                                ? < select
                                    id="note-username"
                                    name="username"
                                    className="form__select"
                                    value={userId}
                                    onChange={onUserIdChanged}
                                >
                                    {options}
                                </select>
                                : <p>{ticket.username}</p>}

                            <label className="form__label form__checkbox-container" htmlFor="importance">
                                IMPORTANCE:</label>
                            {displayEdit
                                ? < select
                                    id="importance"
                                    name="importance"
                                    className="form__select"
                                    value={importance}
                                    onChange={onImportanceChanged}
                                >
                                    {statusOptions}
                                </select>
                                : <p>{importance}</p>}

                            <label className="form__label" htmlFor="dueDate">
                                Due Date:
                            </label>
                            {displayEdit
                                ? < DatePicker
                                    id="dueDate"
                                    name="dueDate"
                                    selected={dueDate}
                                    onChange={onDueDateChanged}
                                    className="form__input"
                                    placeholderText="Select due date"
                                    minDate={new Date()}
                                    autoComplete="off"
                                />
                                : <p>{dueOn}</p>}
                            <label className="form__label form__checkbox-container" htmlFor="comments">
                                COMMENTS:</label>
                            <p>List of comments on ticket...(delete)</p>
                        </div>
                        <div className="form__divider">
                            <p>Revision History:</p>
                            <p>Dropdown list of revisions..</p>
                            <p className="form__created">Created:<br />{created}</p>
                            <p className="form__updated">Due On:<br />{dueOn}</p>
                            {currentUser === userId && extensionRequestButton}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

    return content
}


export default EditTicketForm
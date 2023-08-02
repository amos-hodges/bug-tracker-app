import { useState, useEffect } from 'react'
import { useUpdateTicketMutation } from './ticketsApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCommentMedical, faArrowLeft } from '@fortawesome/free-solid-svg-icons'


const TicketInfo = ({ ticket, userId }) => {

    const { projectId } = useParams()

    const [updateTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTicketMutation()

    const navigate = useNavigate()

    const [completed, setCompleted] = useState(ticket.completed)

    useEffect(() => {
        if (isSuccess) {

            navigate(`/dashboard/projects/${projectId}/tickets`)
        }
    }, [isSuccess, navigate, projectId])

    const canSave = [completed].every(Boolean) && !isLoading
    const onCompletedChanged = e => setCompleted(prev => !prev)

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
        await updateTicket({
            id: ticket.id,
            user: ticket.user,
            title: ticket.title,
            text: ticket.text,
            importance: ticket.importance,
            completed,
            dueDate: ticket.dueDate
        })
    }

    const created = new Date(ticket.createdAt).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })

    const dueOn = new Date(ticket.dueDate).toLocaleString('en-US', {
        day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })

    const errClass = (isError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message) ?? ''

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
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
                        </div>
                    </div>

                    <label className="form__label" htmlFor="note-title">
                        Title:</label>
                    <p>{ticket.title}</p>

                    <label className="form__label" htmlFor="note-text">
                        Description:</label>
                    <p>{ticket.text}</p>

                    <div className="form__row">
                        <div className="form__divider">

                            <label className="form__label form__checkbox-container" htmlFor="note-completed">
                                WORK COMPLETE:
                            </label>
                            {(userId === ticket.user)
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

                            <p>{ticket.username}</p>
                            <label className="form__label form__checkbox-container" htmlFor="importance">
                                IMPORTANCE:</label>
                            <p>{ticket.importance}</p>

                            <label className="form__label" htmlFor="dueDate">
                                Due Date:
                            </label>
                            <p>{dueOn}</p>
                            <label className="form__label form__checkbox-container" htmlFor="comments">
                                COMMENTS:</label>
                            <p>List of comments on ticket...(delete)</p>
                        </div>
                        <div className="form__divider">
                            <p>Revision History:</p>
                            <p>Dropdown list of revisions..</p>
                            <p className="form__created">Created:<br />{created}</p>
                            <p className="form__updated">Due On:<br />{dueOn}</p>
                            {userId === ticket.user && extensionRequestButton}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

    return content
}


export default TicketInfo
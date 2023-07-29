import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { socket } from '../../components/DashboardHeader'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const ExtensionRequestForm = () => {

    const navigate = useNavigate()
    const { projectId, ticketId } = useParams()

    const { ticket } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            ticket: data?.entities[ticketId]
        })
    })

    const [dueDate, setDueDate] = useState(new Date(ticket.dueDate))
    const [requestDescription, setRequestDescription] = useState('')
    const [requestSent, setRequestSent] = useState(false)
    //useCallBack??
    useEffect(() => {
        if (requestSent) {
            setDueDate(null)
            setRequestDescription('')
            setRequestSent(false)
            navigate(`/dashboard/projects/${projectId}/tickets/`)
        }
    }, [requestSent, navigate])

    const onDueDateChanged = date => setDueDate(date)
    const onTextChanged = e => setRequestDescription(e.target.value)

    const handeSendRequest = () => {
        //Add a message to user and timeout
        const notification = `${ticket.username} has requested to extend the following ticket: ${ticket.title}. Requested date: ${dueDate}. Reason: '${requestDescription}'`
        console.log(notification)
        socket.emit('client_request', 'Manager', notification)
        setRequestSent(true)
    }

    const handleBackClick = () => {
        navigate(`/dashboard/projects/${projectId}/tickets/${ticketId}`)
    }

    const canSend = [dueDate, requestDescription].every(Boolean)

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
        </button>
    )

    const validTextClass = !requestDescription ? "form__input--incomplete" : ""
    const validDateClass = !dueDate ? 'form__input--incomplete' : ""
    const content = (
        <>
            {backButton}
            <div className="page-container">
                <form className="form" onSubmit={e => e.preventDefault()}>
                    <div className="form__title-row">
                        <h2>Extension Request Form</h2>
                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                onClick={handeSendRequest}
                                disabled={!canSend}
                            >
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    <label className="form__label" htmlFor="username">
                        Requested Extension Date:
                    </label>
                    <DatePicker
                        id="dueDate"
                        name="dueDate"
                        selected={dueDate}
                        onChange={onDueDateChanged}
                        className={`form__input ${validDateClass}`}
                        placeholderText="Select due date"
                        minDate={new Date()}
                        autoComplete="off"
                    />
                    <label className="form__label" htmlFor="request-text">
                        Reason for request:</label>
                    <textarea
                        className={`form__input form__input--text ${validTextClass}`}
                        id="request-text"
                        name="text"
                        value={requestDescription}
                        onChange={onTextChanged}
                        placeholder="Please include details pertaining to your request."
                    />
                </form>
            </div>

        </>
    )


    return content


}

export default ExtensionRequestForm
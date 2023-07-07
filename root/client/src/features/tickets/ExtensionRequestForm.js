import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { socket } from "../../components/DashboardHeader"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const ExtensionRequestForm = () => {

    const navigate = useNavigate()
    const { projectId, ticketId } = useParams()

    const [dueDate, setDueDate] = useState(null)
    const [employee, setEmployee] = useState('')
    const [requestDescription, setRequestDescription] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    useEffect(() => {
        if (requestSent) {
            setRequestDescription('')
            setRequestSent(false)
            navigate('/dashboard/users')
        }
    }, [requestSent, navigate])

    const onDueDateChanged = date => setDueDate(date)
    const onTextChanged = e => setRequestDescription(e.target.value)

    const handeSendRequest = () => {
        //Add a message to user and timeout
        //console.log(`Sending request to ${requestType}: ${employee}. An Admin will review this request and notify upon approval.`)
        //const notification = `A team manager has made thie following request: ${requestType}: ${employee}. '${requestDescription}'`
        //socket.emit('admin_request', notification)
        setRequestSent(true)
    }

    const handleBackClick = () => {
        navigate(`/dashboard/projects/${projectId}/tickets/${ticketId}`)
    }

    const canSend = [requestDescription].every(Boolean)

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            Back
        </button>
    )

    const validTextClass = !requestDescription ? "form__input--incomplete" : ''
    const validUserClass = !employee ? 'form__input--incomplete' : ''
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
                        className="form__input"
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
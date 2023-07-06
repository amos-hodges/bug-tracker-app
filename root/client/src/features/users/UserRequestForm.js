import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { socket } from "../../components/DashboardHeader"


const UserRequestForm = () => {

    const navigate = useNavigate()

    const reqTypes = ['Add Employee', 'Modify Employee', 'Remove Employee']
    const [requestType, setRequestType] = useState('')
    const [employee, setEmployee] = useState('')
    const [requestDescription, setRequestDescription] = useState('')
    const [requestSent, setRequestSent] = useState(false)

    useEffect(() => {
        if (requestSent) {
            setRequestType('')
            setEmployee('')
            setRequestDescription('')
            setRequestSent(false)
            navigate('/dashboard/users')
        }
    }, [requestSent, navigate])

    const onEmployeeNameChanged = e => setEmployee(e.target.value)
    const onTextChanged = e => setRequestDescription(e.target.value)

    const handeSendRequest = () => {
        //Add a message to user and timeout
        //console.log(`Sending request to ${requestType}: ${employee}. An Admin will review this request and notify upon approval.`)
        const notification = `A team manager has made thie following request: ${requestType}: ${employee}. '${requestDescription}'`
        socket.emit('admin_request', notification)
        setRequestSent(true)
    }

    const handleBackClick = () => {
        navigate('/dashboard/users')
    }

    const canSend = [requestType, requestDescription].every(Boolean)

    const reqOptions = reqTypes.map((type) => (
        <label key={type} className="checkbox-label">
            <input
                type="checkbox"
                value={type}
                checked={type === requestType}
                onChange={() => setRequestType(type)}
            />{' '}
            {type}
        </label>
    ))

    let backButton = (
        <button
            className="navigation-link"
            onClick={handleBackClick}
        >
            User Settings
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
                        <h2>Admin Request Form</h2>
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
                    <label className="form__label" htmlFor="request-type">
                        Type of Request:
                    </label>
                    {reqOptions}
                    <label className="form__label" htmlFor="username">
                        Employee Username:
                    </label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={employee}
                        onChange={onEmployeeNameChanged}
                    />
                    <label className="form__label" htmlFor="request-text">
                        Description of request:</label>
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

export default UserRequestForm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
//will eventually switch to a side bar nav with current user--footer will have copyright
const DashboardFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dashboard')
    let goHomeButton = null
    //only appear on other pages
    if (pathname !== '/dashboard') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }
    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current user: {username}</p>
            <p>Status: {status} </p>
        </footer>
    )
    return content
}

export default DashboardFooter
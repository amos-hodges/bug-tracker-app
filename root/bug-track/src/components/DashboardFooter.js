import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
//will eventually switch to a side bar nav with current user--footer will have copyright
const DashboardFooter = () => {
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
            <p>Current user:</p>
            <p>Status:</p>
        </footer>
    )
    return content
}

export default DashboardFooter
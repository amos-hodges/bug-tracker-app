// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHouse } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashboardFooter = () => {

    const { username, status } = useAuth()
    //const { pathname } = useLocation()
    //const navigate = useNavigate()

    // const onGoHomeClicked = () => navigate('/dashboard')
    // let goHomeButton = null
    //only appear on other pages
    // if (pathname !== '/dashboard') {
    //     goHomeButton = (
    //         <button
    //             className="dash-footer__button icon-button"
    //             title="home"
    //             onClick={onGoHomeClicked}
    //         >
    //             <FontAwesomeIcon icon={faHouse} />
    //         </button>
    //     )
    // }
    const content = (
        <footer className="dash-footer">
            {/* {goHomeButton} */}
            <p>Current user: {username}</p>
            <p>Status: {status} </p>
        </footer>
    )
    return content
}

export default DashboardFooter
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import { useEffect } from 'react'

const Sidebar = () => {

    const { isAdmin, isManager } = useAuth()
    const navigate = useNavigate()
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    let mode = (isAdmin || isManager) ? 'All' : 'My'

    let logoutButton
    if (isLoading) {
        logoutButton = <PulseLoader color={"#FFF"} />
    } else {
        logoutButton = (
            <button
                className="icon-button logout"
                title="Logout"
                onClick={sendLogout}
            >
                Sign&nbsp;Out&nbsp;
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
        )
    }
    if (isError) {
        console.log(error)
    }
    // eventually add logic to close sidebar if user clicks link to current page
    const content = (
        <div className="sidebar">
            <div className="sidebar__title">
                < Link to="/dashboard" >
                    <span className="icon-button">
                        <FontAwesomeIcon icon={faBug} />
                    </span>
                    <h2>Bug Tracker</h2>
                </Link >
            </div >
            <div className="sidebar_button"><Link to="/dashboard/projects">{mode} Projects</Link></div>
            {(isManager || isAdmin)
                ? <div className="sidebar_button"><Link to="/dashboard/users">User Settings</Link></div>
                : <div className="sidebar_button"><Link to="team/all">Collaborate</Link></div>
            }
            <div className="sidebar_button"><Link to="/dashboard/projects/all/tickets">{mode} Tickets</Link></div>
            <div className="sidebar_button"><Link to="profile">Profile</Link></div>
            <div className="sidebar_button"><Link to="settings">Settings</Link></div>

            {logoutButton}
        </div >
    )

    return content
}

export default Sidebar
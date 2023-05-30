import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faFileCirclePlus,
    faFolderPlus,
    faCircleUser,
    faGear,
    faUsersGear,
    faUserPlus,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
//const TICKETS_REGEX = /^\/dashboard\/projects\/\w+\/tickets(\/)?$/
const TICKETS_REGEX = /^\/dashboard\/projects\/(?!all\b)\w+\/tickets(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/
//DISPLAY THE CURRENT PROJECT IN THE HEADER
const DashboardHeader = ({ toggleSidebar }) => {

    const { projectId } = useParams()

    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()

    const { pathname } = useLocation()

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

    const onNewProjectClicked = () => navigate('/dashboard/projects/new')
    const onNewTicketClicked = () => navigate(`projects/${projectId}/tickets/new`)
    const onNewUserClicked = () => navigate('/dashboard/users/new')
    const onUserSettingsClicked = () => navigate('/dashboard/users')
    const onProfileClicked = () => navigate('/dashboard/profile')
    const onSettingsClicked = () => navigate('/dashboard/settings')

    let sidebarToggle = (
        <button
            className="icon-button"
            title="sidebar"
            onClick={toggleSidebar}
        >
            <FontAwesomeIcon icon={faBars} />
        </button>
    )

    let newProjectButton = null
    if (isManager || isAdmin) {
        if (DASHBOARD_REGEX.test(pathname)) {
            newProjectButton = (
                <button
                    className="icon-button"
                    title="New Project"
                    onClick={onNewProjectClicked}
                >
                    <FontAwesomeIcon icon={faFolderPlus} />
                </button>
            )
        }
    }
    let newTicketButton = null
    if (TICKETS_REGEX.test(pathname)) {
        newTicketButton = (
            <button
                className="icon-button"
                title="New Ticket"
                onClick={onNewTicketClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (isManager || isAdmin) {
        if (USERS_REGEX.test(pathname)) {
            newUserButton = (
                <button
                    className="icon-button"
                    title="New User"
                    onClick={onNewUserClicked}
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            )
        }
    }

    let userSettingsButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dashboard')) {
            userSettingsButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUserSettingsClicked}
                >
                    <FontAwesomeIcon icon={faUsersGear} />
                </button>
            )
        }
    }

    let ticketsButton = null

    // AVAILABLE ON ALL PAGES

    const profileButton = (
        <button
            className='icon-button'
            title="profile"
            onClick={onProfileClicked}
        >
            {/* Eventually replace with user thumbnail */}
            <FontAwesomeIcon icon={faCircleUser} />
        </button>
    )
    const settingsButton = (
        <button
            className='icon-button'
            title="settings"
            onClick={onSettingsClicked}
        >
            <FontAwesomeIcon icon={faGear} />
        </button>
    )
    //Game time decision
    // const logoutButton = (
    //     <button
    //         className="icon-button"
    //         title="Logout"
    //         onClick={sendLogout}
    //     >
    //         <FontAwesomeIcon icon={faRightFromBracket} />
    //     </button>
    // )

    const errClass = isError ? "errMsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newProjectButton}
                {newTicketButton}
                {newUserButton}
                {ticketsButton}
                {userSettingsButton}
                {profileButton}
                {settingsButton}
                {/* {logoutButton} */}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className="dash-header__container">
                    {sidebarToggle}
                    <Link to="/dashboard">
                        <h1 className="dash-header__title">Bug Tracker</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )
    return content
}

export default DashboardHeader
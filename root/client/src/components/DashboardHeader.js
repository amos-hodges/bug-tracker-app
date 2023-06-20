import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faFileCirclePlus,
    faFolderPlus,
    faCircleUser,
    faGear,
    faUsersGear,
    faUserPlus,
    faBell,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import NotificationModal from '../features/notifications/NotificationModal'
import { useGetNotificationsQuery } from '../features/notifications/notificationApiSlice'
import NotificationList from '../features/notifications/NotificationList'


const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const TICKETS_REGEX = /^\/dashboard\/projects\/(?!all\b)\w+\/tickets(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/

//DISPLAY THE CURRENT PROJECT IN THE HEADER
const DashboardHeader = ({ toggleSidebar }) => {

    const modalRef = useRef()
    const buttonRef = useRef()

    const { projectId } = useParams()

    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    // const [unreadNotifications, setUnreadNotifications] = useState(0)

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    useEffect(() => {
        const handler = (e) => {
            if (!modalRef.current) {
                return
            }
            if (!modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
                setIsModalOpen(false)
            }
        }

        document.addEventListener('click', handler, true)

        return () => {
            document.removeEventListener('click', handler)
        }
    }, [])

    const onNewProjectClicked = () => navigate('/dashboard/projects/new')
    const onNewTicketClicked = () => navigate(`projects/${projectId}/tickets/new`)
    const onNewUserClicked = () => navigate('/dashboard/users/new')
    const onUserSettingsClicked = () => navigate('/dashboard/users')
    const onProfileClicked = () => navigate('/dashboard/profile')
    const onSettingsClicked = () => navigate('/dashboard/settings')
    const handleNotificationsClicked = () => {
        setIsModalOpen(!isModalOpen)
    }

    const modalContent = (
        <NotificationModal isOpen={isModalOpen} onClose={handleNotificationsClicked}>
            <NotificationList />
        </NotificationModal>
    )

    const unreadNotifications = 11
    let notificationIcon = (
        <button
            ref={buttonRef}
            className="icon-button notify"
            title="Notifications"
            onClick={handleNotificationsClicked}
        >
            <FontAwesomeIcon icon={faBell} />
            {unreadNotifications > 0
                && <span className="notification-bubble">
                    {unreadNotifications}
                </span>
            }
        </button>
    )

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
            title="Profile"
            onClick={onProfileClicked}
        >
            {/* Eventually replace with user thumbnail */}
            <FontAwesomeIcon icon={faCircleUser} />
        </button>
    )
    const settingsButton = (
        <button
            className='icon-button'
            title="Settings"
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
                {notificationIcon}
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
            <div ref={modalRef}>
                {modalContent}
            </div>
        </>
    )
    return content
}

export default DashboardHeader
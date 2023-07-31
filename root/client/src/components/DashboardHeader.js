import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    // faRightFromBracket,
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
//import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
//import PulseLoader from 'react-spinners/PulseLoader'
import NotificationList from '../features/notifications/NotificationList'

import socketIOClient from 'socket.io-client'
import Modal from './Modal'
export const socket = socketIOClient('http://localhost:3500/')

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const TICKETS_REGEX = /^\/dashboard\/projects\/(?!all\b)\w+\/tickets(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/

//DISPLAY THE CURRENT PROJECT IN THE HEADER
const DashboardHeader = ({ toggleSidebar }) => {

    const modalRef = useRef()
    const buttonRef = useRef()

    const { projectId } = useParams()

    const { userId, isManager, isAdmin } = useAuth()

    const navigate = useNavigate()

    const { pathname } = useLocation()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadNotifications, setUnreadNotifications] = useState(0)

    useEffect(() => {
        //this will likely go somewhere else
        socket.emit('user_connected', userId)
        socket.emit('initial_data', userId)
        socket.on('get_data', getData)
        socket.on('change_data', changeData)
        return () => {
            socket.off('get_data')
            socket.off('change_data')
        }
    }, [])

    const getData = (notifications) => {
        //count # of notifications with status === false
        const unreadNotifications = notifications.filter(notification => !notification.status).length
        setNotifications(notifications)
        setUnreadNotifications(unreadNotifications)
    }

    const changeData = () => socket.emit('initial_data', userId)

    // const [sendLogout, {
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // }] = useSendLogoutMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate('/')
    //     }
    // }, [isSuccess, navigate])

    //close modal when clicked off
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
        socket.emit('check_notifications', userId)
        setIsModalOpen(!isModalOpen)
    }

    const modalContent = isModalOpen && (
        <Modal
            className={"modal-overlay"}
            timeOut={150000}
            onClose={handleNotificationsClicked}>
            <div className="modal-content">
                <NotificationList notifications={notifications} />
            </div>
        </Modal>
    )



    let notificationButton = (
        <button
            ref={buttonRef}
            className='icon-button notify'
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
    if (isAdmin) {
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

    //const errClass = isError ? "errMsg" : "offscreen"

    let buttonContent

    // if (isLoading) {
    //     buttonContent = <PulseLoader color={"#FFF"} />
    // } else {
    buttonContent = (
        <>
            {newProjectButton}
            {newTicketButton}
            {newUserButton}
            {userSettingsButton}
            {profileButton}
            {notificationButton}
            {settingsButton}
            {/* {logoutButton} */}
        </>
    )
    // }

    let sidebarToggle = (
        <button
            className="icon-button"
            title="sidebar"
            onClick={toggleSidebar}
        >
            <FontAwesomeIcon icon={faBars} />
        </button>
    )

    const content = (
        <>
            {/* <p className={errClass}>{error?.data?.message}</p> */}

            <header className="dash-header">
                <div className="dash-header__container">
                    {sidebarToggle}
                    <Link to="/dashboard">
                        <h1 className="dash-header__title text_overflow">Bug Tracker</h1>
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
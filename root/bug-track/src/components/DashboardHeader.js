import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const TICKETS_REGEX = /^\/dashboard\/tickets(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/

const DashboardHeader = () => {

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

    const onNewTicketClicked = () => navigate(':id/tickets/new')
    const onNewUserClicked = () => navigate('/dashboard/users/new')
    const onTicketsClicked = () => navigate('/dashboard/tickets')
    const onUsersClicked = () => navigate('/dashboard/users')


    let dashClass = null
    if (!DASHBOARD_REGEX.test(pathname) && !TICKETS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
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

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dashboard')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let ticketsButton = null
    if (!TICKETS_REGEX.test(pathname) && pathname.includes('/dashboard')) {
        ticketsButton = (
            <button
                className="icon-button"
                title="Tickets"
                onClick={onTicketsClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errMsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newTicketButton}
                {newUserButton}
                {ticketsButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
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
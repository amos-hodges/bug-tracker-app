import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/
const TICKETS_REGEX = /^\/dashboard\/tickets(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/

const DashboardHeader = () => {

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

    if (isLoading) {
        return <p>Logging out...</p>
    }

    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    let dashClass = null
    if (!DASHBOARD_REGEX.test(pathname) && !TICKETS_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
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

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dashboard">
                    <h1 className="dash-header__title">Bug Tracker</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* will add later */}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )
    return content
}

export default DashboardHeader
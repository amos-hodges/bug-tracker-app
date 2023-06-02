//import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBug, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import { useEffect } from "react"

const Sidebar = ({ isSidebarOpen }) => {

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

    let sideBarClass = isSidebarOpen ? "sidebar" : "sidebar--open"

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
        <div className={sideBarClass}>

            <div className="sidebar__title">
                <Link to='/dashboard'>
                    <span className="icon-button">
                        <FontAwesomeIcon icon={faBug} />
                    </span>
                    <h2>Bug Tracker</h2>
                </Link>
            </div>

            <p><Link to="/dashboard">{mode} Projects</Link></p>

            {(isManager || isAdmin)
                ? <p><Link to="/dashboard/users">User Settings</Link></p>
                : <p><Link to="team/all">Collaborate</Link></p>}


            <p><Link to="/dashboard/projects/all/tickets">All Tickets</Link></p>


            <p><Link to="profile">Profile</Link></p>

            <p><Link to="settings">Settings</Link></p>

            {logoutButton}
        </div>
    )

    return content
}

export default Sidebar
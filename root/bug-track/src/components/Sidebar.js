//import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBug } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = ({ isSidebarOpen }) => {

    const { isAdmin, isManager } = useAuth()

    let mode = (isAdmin || isManager) ? 'All' : 'My'

    let sideBarClass = isSidebarOpen ? "sidebar" : "sidebar--open"

    return (
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
            <p><Link to="team">My Team</Link></p>
            {(isManager || isAdmin) && <p><Link to="/dashboard/users">User Settings</Link></p>}
            {(isManager || isAdmin) && <p>All Tickets</p>}
            <p>My Tickets</p>
            <p><Link to="profile">Profile</Link></p>
            <p><Link to="settings">Settings</Link></p>
        </div>
    )
}

export default Sidebar
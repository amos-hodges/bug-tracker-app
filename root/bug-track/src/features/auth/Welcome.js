import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ProjectList from '../projects/ProjectList'
//This is where current projects will be displayed
const Welcome = () => {

    const { username, userId, isManager, isAdmin } = useAuth()
    console.log(username, userId, isManager, isAdmin)
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const message = !isManager && !isAdmin ? 'My Projects' : 'All Projects'

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome {username}</h1>
            <p>{message}</p>
            <ProjectList />
            <p><Link to="/dashboard/tickets">View Tickets</Link></p>

            <p><Link to="/dashboard/tickets/new">Create a new Ticket</Link></p>
            {/* simplify logic after final access features are determined*/}
            {(isManager || isAdmin) && <p><Link to="/dashboard/users">Views User Settings</Link></p>}

            {(isAdmin) && <p><Link to="/dashboard/users/new">Add a New User</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dashboard/projects">Views Projects</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dashboard/projects/new">Create New Project</Link></p>}
        </section>
    )

    return content
}

export default Welcome
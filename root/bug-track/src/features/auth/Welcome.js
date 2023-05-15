import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
//This is where current projects will be displayed
const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome {username}</h1>
            <p><Link to="/dashboard/tickets">View Tickets</Link></p>

            <p><Link to="/dashboard/tickets/new">Create a new Ticket</Link></p>
            {/* simplify logic after final access features are determined*/}
            {(isManager || isAdmin) && <p><Link to="/dashboard/users">Views User Settings</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dashboard/users/new">Add a New User</Link></p>}
        </section>
    )
    return content
}

export default Welcome
import { Link } from 'react-router-dom'
//will be customized once auth is complete
const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome</h1>
            <p><Link to="dashboard/tickets">View Tickets</Link></p>
            {/* will only be available to certain roles */}
            <p><Link to="dashboard/users">Views User Settings</Link></p>
        </section>
    )
    return content
}

export default Welcome
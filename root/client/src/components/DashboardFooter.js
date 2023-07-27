import useAuth from '../hooks/useAuth'

const DashboardFooter = () => {

    const { username, status } = useAuth()

    const today = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full'
    }).format(new Date())

    const content = (
        <footer className="dash-footer">
            <div className="user-status">
                <p>Current user: {username}</p>
                <p>Status: {status} </p>
            </div>
            <p>{today}</p>
        </footer>
    )
    return content
}

export default DashboardFooter
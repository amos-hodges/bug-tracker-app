import { Link } from 'react-router-dom'

const DashboardHeader = () => {
    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dashboard">
                    <h1 className="dash-header__title">Bug Tracker</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* will add later */}
                </nav>
            </div>
        </header>
    )
    return content
}

export default DashboardHeader
import { Link } from 'react-router-dom'

//public facing page for bug tracker app
//will customize once backend is connected
const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Bug Tracker!</span></h1>
            </header>
            <main className="public__main">
                <p>One stop shop for project management and issue tracking</p>
                <br />
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}

export default Public
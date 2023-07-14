//import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ProjectList from '../projects/ProjectList'
//This is where current projects will be displayed
const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    const date = new Date()

    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const message = !isManager && !isAdmin ? 'My Projects' : 'All Projects'

    const content = (
        <>
            {/* <section className="welcome">
                <p>{today}</p>
                <h1>Welcome {username}</h1>
                <p>{message}</p>
            </section> */}
            <ProjectList />
        </>

    )

    return content
}

export default Welcome
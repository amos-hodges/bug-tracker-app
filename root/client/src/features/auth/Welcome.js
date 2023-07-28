
import useAuth from '../../hooks/useAuth'
import ProjectGrid from '../projects/ProjectGrid'
import ProjectList from '../projects/ProjectList'
//This is where current projects will be displayed
const Welcome = () => {

    const { username } = useAuth()

    const date = new Date()

    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const message = <h1>Welcome {username}</h1>

    const content = (
        <>
            <ProjectGrid header={message} date={today} />
        </>

    )

    return content
}

export default Welcome
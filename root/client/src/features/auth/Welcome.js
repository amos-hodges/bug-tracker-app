
import useAuth from '../../hooks/useAuth'
import ProjectGrid from '../projects/ProjectGrid'
//This is where current projects will be displayed
const Welcome = () => {

    const { username } = useAuth()

    const date = new Date()

    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)


    const content = (
        <>
            <section className="welcome">
                <h1>Welcome {username}</h1>
                <p>{today}</p>
            </section>
            <ProjectGrid />
        </>

    )

    return content
}

export default Welcome
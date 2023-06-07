import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import useAuth from '../../hooks/useAuth'
import { useParams, Link } from 'react-router-dom'

const Team = () => {

    const { userId, isAdmin, isManager } = useAuth()

    const { projectId } = useParams()

    const { data: projects,
        isLoading: isProjectLoading,
        isSuccess: isProjectSuccess,
        isError: isProjectError
    } = useGetProjectsQuery('projectsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading || isProjectLoading) content = <PulseLoader color={"#FFF"} />

    if (isError || isProjectError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess && isProjectSuccess) {

        const { entities } = users
        const currentUser = entities[userId]

        let tableContent

        const handleMessageClicked = (username) => {
            //TO-DO
            console.log(`messaging ${username}`)
        }

        //exclude current user
        //only display shared projects on 'all' page
        tableContent = Object.values(entities)
            .filter((user) => user.id !== currentUser.id && (projectId === 'all' || (user.projects.includes(projectId) && user.id !== userId)))
            .map((user) => (
                <tr key={user.id}>
                    <td className="table__cell">
                        {user.username}
                        <button
                            className="message-button"
                            onClick={() => handleMessageClicked(user.username)}
                        >
                            Message
                        </button>
                    </td>
                    {projectId === 'all' && (
                        <td className="table__cell">
                            {projects.ids
                                .filter((projectId) => currentUser.projects.includes(projectId) && user.projects.includes(projectId))
                                .map((projectId) => {
                                    const project = projects.entities[projectId];
                                    return (
                                        <span key={project.id} className="project-link">
                                            <Link to={`/dashboard/projects/${projectId}/tickets`}>
                                                {project.title}
                                            </Link>
                                        </span>
                                    );
                                })}
                        </td>
                    )}
                </tr>
            ));


        const tableClass = (projectId === 'all')
            ? "table--team"
            : "table--team__single"

        content = (
            <>
                <div className="form__title-row">
                    <h2>{(projectId === 'all') ? 'My Teams' : 'My Team'}</h2>
                </div>
                <div className="list-container">
                    <table className={`table ${tableClass}`}>
                        <thead className="table__head">
                            <tr>
                                <th scope="col" className="table__th user__username">
                                    User
                                </th>
                                {(projectId === 'all') && <th scope="col" className="table__th user__roles">
                                    Shared Projects
                                </th>}
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                    {(isAdmin || isManager) && <Link to={'/dashboard/users'} className="new-ticket-button">
                        Add User to Project
                    </Link >}
                </div >
            </>
        )
    }

    return content
}

export default Team
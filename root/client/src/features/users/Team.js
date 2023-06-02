import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'

const Team = () => {
    const { userId } = useAuth()

    const { projectId } = useParams()

    const { data: projects,
        isLoading: isProjectLoading,
        isSuccess: isProjectSuccess,
        isError: isProjectError
    } = useGetProjectsQuery('projectsList', {
        //every 15 seconds
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
        //every 15 seconds
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

        if (projectId === 'all') {

            //figure out beter formatting, links to projects, add message button
            tableContent = Object.values(entities)
                .filter((user) => user.id !== currentUser.id) // Exclude current user
                .map((user) => {

                    const sharedProjects = projects.ids.filter((projectId) =>
                        user.projects.some((userProjectId) => userProjectId === projectId)
                    )

                    return sharedProjects?.length ? (
                        <tr key={user.id}>
                            <td className="table__cell">{user.username}</td>
                            <td className="table__cell">
                                {sharedProjects.map((projectId) => {
                                    const project = projects.entities[projectId]
                                    return <span key={project.id}>{project.title}</span>
                                })}
                            </td>
                        </tr>
                    ) : null;
                })
        } else {
            const project = projects.entities[projectId]
            tableContent = Object.values(entities)
                .filter((user) => user.projects.includes(projectId) && user.id !== userId)
                .map((user) => (
                    <tr key={user.id}>
                        <td className="table__cell">{user.username}</td>
                        <td className="table__cell">{project.title}</td>
                    </tr>
                ))
        }
        content = (
            <>
                <div className="form__title-row">
                    <h2>My Teams</h2>
                </div>
                <div className="list-container">
                    <table className="table table--team">
                        <thead className="table__head">
                            <tr>
                                <th scope="col" className="table__th user__username">
                                    User
                                </th>
                                <th scope="col" className="table__th user__roles">
                                    Shared Projects
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                </div >
            </>
        )
    }

    return content
}

export default Team
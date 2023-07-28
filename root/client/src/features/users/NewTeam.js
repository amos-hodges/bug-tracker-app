import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import useAuth from '../../hooks/useAuth'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import SortIndicator from '../../components/SortIndicator'

const Team = () => {

    const { userId, isAdmin, isManager } = useAuth()

    const { projectId } = useParams()
    const allProjects = (projectId === 'all')

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

    const handleMessageClicked = (username) => {
        //TO-DO
        console.log(`messaging ${username}`)
    }

    let content

    if (isLoading || isProjectLoading) content = <PulseLoader color={"#FFF"} />

    if (isError || isProjectError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess && isProjectSuccess) {

        const { ids, entities } = users
        const currentUser = entities[userId]

        //-all users when viewing from all projects
        //-only users asigned to project when viewing from a specific project
        const teamIds = ids.filter((id) => {
            const notCurrentUser = id !== userId
            const userAssignedProject = entities[id].projects.includes(projectId)
            return notCurrentUser && (allProjects || userAssignedProject)
        })


        const tableContent = filteredAndSortedIds
            .filter((user_Id) => user_Id !== currentUser.id
                && (projectId === 'all'
                    || (entities[user_Id].projects.includes(projectId)
                        && user_Id !== userId)))
            .map((userId) => {
                const user = entities[userId]
                return (
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
                                        const project = projects.entities[projectId]
                                        return (
                                            <span key={project.id} className="project-link">
                                                <Link to={`/dashboard/projects/${projectId}/tickets`}>
                                                    {project.title}
                                                </Link>
                                            </span>
                                        )
                                    })}
                            </td>
                        )}
                    </tr>
                )
            })

        content = (
            <>
                <div className="form__title-row">
                    <h2>{(projectId === 'all') ? 'My Teams' : 'My Team'}</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className="list-container">
                    <table className={`table ${tableClass}`}>
                        <thead className="table__head">
                            <tr>
                                <th scope="col" className="table__th user__username"
                                    onClick={() => handleSort("username")}>
                                    User
                                    {sortCategory === "username" && <SortIndicator order={sortOrder} />}
                                </th>
                                {(projectId === 'all')
                                    && <th scope="col" className="table__th user__roles">
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
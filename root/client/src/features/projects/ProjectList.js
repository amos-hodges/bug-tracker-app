import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import SortIndicator from '../../components/SortIndicator'
import useAuth from '../../hooks/useAuth'
import Project from './Project'
import PulseLoader from 'react-spinners/PulseLoader'
import { useState } from 'react'

const ProjectList = () => {

    const { userId, isManager, isAdmin } = useAuth()

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId],

        })
    })

    const {
        data: projects,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProjectsQuery('projectsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    const [sortCategory, setSortCategory] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const categoryMap = {
            project: "title",
            description: "description",
            created: "createdAt",
            updated: "updatedAt",
            tickets: "ticketCount",
            employees: "userCount"
        }

        const { ids, entities } = projects

        //Only display assigned projects for employees
        const filteredProjectIds = (isAdmin || isManager)
            ? ids
            : user?.projects || [];

        const sortedIds = [...filteredProjectIds].sort((a, b) => {
            const aValue = entities[a][categoryMap[sortCategory]]
            const bValue = entities[b][categoryMap[sortCategory]]
            if (sortOrder === "asc") {
                if (aValue < bValue) return -1
                if (aValue > bValue) return 1
                return 0
            } else {
                if (bValue < aValue) return -1
                if (bValue > aValue) return 1
                return 0
            }
        })

        const tableContent = sortedIds.length > 0 ? (
            sortedIds.map(projectId => (
                <Project
                    key={projectId}
                    projectId={projectId}
                    hideEdit={isAdmin || isManager}
                    ticketCount={entities[projectId].ticketCount}
                    userCount={entities[projectId].userCount}
                />
            ))
        ) : (
            <tr>
                <td colSpan="6">No projects found.</td>
            </tr>
        )

        const tableClass = isAdmin || isManager ? "table table--projects" : "table table--projects__noEdit"
        const editColumn = isAdmin || isManager ? (
            <th scope="col" className="table__th note__edit">Edit</th>
        ) : null

        const handleSort = (category) => {
            if (sortCategory === category) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            } else {
                setSortCategory(category)
                setSortOrder("asc")
            }
        }

        content = (
            <div className="list-container">
                <table className={tableClass}>
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("project")}>
                                Project
                                {sortCategory === "project" && <SortIndicator order={sortOrder} />}
                            </th>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("description")}>
                                Description
                                {sortCategory === "description" && <SortIndicator order={sortOrder} />}
                            </th>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("created")}>
                                Created
                                {sortCategory === "created" && <SortIndicator order={sortOrder} />}
                            </th>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("updated")}>
                                Last Modified
                                {sortCategory === "updated" && <SortIndicator order={sortOrder} />}
                            </th>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("tickets")}>
                                Tickets
                                {sortCategory === "tickets" && <SortIndicator order={sortOrder} />}
                            </th>
                            <th scope="col" className="table__th note__title"
                                onClick={() => handleSort("employees")}>
                                Active Employees
                                {sortCategory === "employees" && <SortIndicator order={sortOrder} />}
                            </th>
                            {editColumn}
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </div>
        )
    }
    return content
}

export default ProjectList

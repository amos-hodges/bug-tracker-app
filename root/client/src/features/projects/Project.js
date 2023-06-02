//format similar to user and ticket.Project name, description, tickets (for user or total)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetTicketsQuery } from '../tickets/ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'

//import { useMemo } from 'react'

const Project = ({ projectId, hideEdit }) => {

    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        })
    })

    const { data: ticketsData } = useGetTicketsQuery('ticketsList')
    const { data: usersData } = useGetUsersQuery('usersList')



    const getTicketsCount = () => {
        const tickets = ticketsData?.entities || {}
        return Object.values(tickets).filter(ticket => ticket.project === projectId).length
    }

    const getUsersCount = () => {
        const users = usersData?.entities || {}
        return Object.values(users).filter(user => user.projects.includes(projectId)).length
    }

    const ticketsCount = getTicketsCount()
    const usersCount = getUsersCount()
    const navigate = useNavigate()

    if (project) {

        const created = new Date(project.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(project.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dashboard/projects/${projectId}`)
        const handleTitleClick = () => navigate(`/dashboard/projects/${projectId}/tickets`)
        const handleEmployeesClicked = () => navigate(`/dashboard/team/${projectId}`)
        //**********update CSS classes
        return (
            <tr className="table__row">


                <td className="table__cell note__title">
                    <button className="title-button" onClick={handleTitleClick}>
                        {project.title}
                    </button>
                </td>
                <td className="table__cell note__username">{project.description}</td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__updated">{ticketsCount}</td>
                <td className="table__cell">
                    {usersCount}
                    <button className="employees-button" onClick={handleEmployeesClicked}>
                        View Team
                    </button>
                </td>

                {hideEdit && <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>}
            </tr>
        )
    } else return null
}

export default Project
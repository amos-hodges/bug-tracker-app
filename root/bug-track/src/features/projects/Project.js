//format similar to user and ticket.Project name, description, tickets (for user or total)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetTicketsQuery } from '../tickets/ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'

const Project = ({ projectId, hideEdit }) => {
    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        })
    })

    const { tickets } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            tickets: Object.values(data?.entities).filter(
                (ticket) => ticket?.project === projectId
            ),
        }),
    })

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: Object.values(data?.entities).filter(
                (user) => user?.projects.includes(projectId)
            ),
        }),
    })

    const navigate = useNavigate()

    if (project) {
        //add timestamps to project model
        const created = new Date(project.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(project.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dashboard/projects/${projectId}`)
        const handleTitleClick = () => navigate(`/dashboard/projects/${projectId}/tickets`)
        //update CSS classes
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
                <td className="table__cell note__updated">{tickets.length}</td>
                <td className="table__cell note__updated">{users.length}</td>

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
//format similar to user and ticket.Project name, description, tickets (for user or total)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetProjectsQuery } from './projectsApiSlice'

const Project = ({ projectId, hideEdit, ticketCount, userCount }) => {

    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        })
    })

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
                    {project.title}
                    <button className="title-button" onClick={handleTitleClick}>
                        Open
                    </button>
                </td>
                <td className="table__cell note__username">{project.description}</td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__updated">{ticketCount}</td>
                <td className="table__cell">
                    {userCount}
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
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


                <td >
                    {project.title}
                    <button className="button-18" onClick={handleTitleClick}>
                        Open
                    </button>
                </td>
                <td >{project.description}</td>
                <td >{created}</td>
                <td >{updated}</td>
                <td >{ticketCount}</td>
                <td >
                    {userCount}
                    <button className="button-18" onClick={handleEmployeesClicked}>
                        View Team
                    </button>
                </td>

                {hideEdit && <td>
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
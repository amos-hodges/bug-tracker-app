import { useParams } from 'react-router-dom'
import EditProjectForm from './EditProjectForm'
import { useGetProjectsQuery } from './projectsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetTicketsQuery } from '../tickets/ticketsApiSlice'

const EditProject = () => {
    const { projectId } = useParams()

    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[projectId]
        })
    })

    const { tickets } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            tickets: Object.values(data?.entities).filter(
                (ticket) => ticket?.project === project.id
            ),
        }),
        skip: !project,
    })

    if (!project) return <PulseLoader color={'#FFF'} />

    const content = (
        <EditProjectForm project={project} tickets={tickets} />
    )

    return content
}

export default EditProject
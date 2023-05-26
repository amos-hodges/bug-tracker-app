import { useParams } from 'react-router-dom'
import EditProjectForm from './EditProjectForm'
import PulseLoader from 'react-spinners/PulseLoader'
import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetTicketsQuery } from '../tickets/ticketsApiSlice'

const EditProject = () => {
    const { projectId } = useParams()

    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities?.[projectId]
        })
    })

    const { tickets } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            tickets: Object.values(data?.entities || {}).filter(
                (ticket) => ticket?.project === project.id
            ),
        }),

    })

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })


    if (!project) return <PulseLoader color={'#FFF'} />

    const content = (
        <EditProjectForm project={project} tickets={tickets} users={users} />
    )

    return content
}

export default EditProject
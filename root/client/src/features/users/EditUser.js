import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import { useGetTicketsQuery } from '../tickets/ticketsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {
    const { id } = useParams()

    const { user, isLoading: isUsersLoading } = useGetUsersQuery('userList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    const { projects, isLoading: isProjectsLoading } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            projects: data?.ids.map(id => data?.entities[id])
        })
    })
    // all tickets associated with current user
    const { tickets, isLoading: isTicketsLoading } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            tickets: Object.values(data?.entities || {}).filter(
                (ticket) => ticket?.username === user?.username
            ),
        }),
    })

    if (isUsersLoading || isProjectsLoading || isTicketsLoading) return <PulseLoader color={'#FFF'} />

    if (!user || !projects || !tickets) {
        return <div>Failed to fetch data.</div>
    }

    const content = <EditUserForm user={user} projects={projects} tickets={tickets} />

    return content
}

export default EditUser
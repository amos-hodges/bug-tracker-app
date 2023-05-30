import { useParams } from 'react-router-dom'
import EditTicketForm from './EditTicketForm'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'


const EditTicket = () => {
    const { ticketId } = useParams()

    const { ticket } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            ticket: data?.entities[ticketId]
        })
    })

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!ticket || !users.length) return <PulseLoader color={'#FFF'} />

    const content = <EditTicketForm ticket={ticket} users={users} />

    return content
}

export default EditTicket
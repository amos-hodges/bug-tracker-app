import { useParams } from 'react-router-dom'
import EditTicketForm from './EditTicketForm'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useAuth from '../../hooks/useAuth'
import TicketInfo from './TicketInfo'

const EditTicket = () => {
    const { ticketId } = useParams()
    const { userId, isAdmin, isManager } = useAuth()

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

    if (!ticket || !users?.length) return <PulseLoader color={'#FFF'} />

    let content

    if (isAdmin || isManager) {
        content = <EditTicketForm ticket={ticket} users={users} />
    } else {
        content = <TicketInfo ticket={ticket} userId={userId} />
    }

    return content
}

export default EditTicket
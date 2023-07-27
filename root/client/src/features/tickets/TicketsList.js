import { useGetTicketsQuery } from './ticketsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import { useParams, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import SortableTable from '../../components/SortableTable'
import { ticketListConfig } from '../../config/ticket-list-config'
import { useNavigate } from 'react-router-dom'
const TicketsList = () => {

    const { projectId } = useParams()
    const { userId, isAdmin, isManager } = useAuth()

    const allTickets = (projectId === 'all')
    const navigate = useNavigate()

    const {
        data: tickets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTicketsQuery('ticketsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,

    })

    const keyFn = (ticket) => {
        return ticket.id
    }

    const navFn = (link) => {
        navigate(link)
    }

    const newTicketButton = (
        <Link
            to={`/dashboard/projects/${projectId}/tickets/new`}
            className="button-18">
            New Ticket
        </Link >
    )

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <><p className="errmsg">{error?.data?.message}</p></>
    }

    if (isSuccess) {

        const { ids, entities } = tickets

        let filteredIds = allTickets
            ? (isAdmin || isManager ? ids : ids.filter((ticketId) => entities[ticketId].user === userId))
            : ids.filter((ticketId) => entities[ticketId].project === projectId)

        const ticketsData = filteredIds.map((id) => entities[id])

        const projectTitle = filteredIds.length > 0 ? entities[filteredIds[0]]?.projectTitle : ''
        const header = allTickets ? <h1>All Tickets</h1> : <h1>{projectTitle}</h1>

        content = (
            <div className="table__container">
                <SortableTable
                    header={header}
                    button={newTicketButton}
                    data={ticketsData}
                    config={ticketListConfig}
                    keyFn={keyFn}
                    navFn={navFn}
                />
            </div>
        )

    }
    return content
}


export default TicketsList
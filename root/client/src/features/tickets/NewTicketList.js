import { useGetTicketsQuery } from './ticketsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import { useParams, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import SortableTable from '../../components/SortableTable'

const NewTicketsList = () => {

    const { projectId } = useParams()
    const allTickets = (projectId === 'all')
    const { userId, isAdmin, isManager } = useAuth()

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

    const config = [
        {
            label: 'Title',
            render: (ticket) => ticket.title,
            sortValue: (ticket) => ticket.title
        },
        {
            label: 'Project',
            render: (ticket) => ticket.projectTitle,
            sortValue: (ticket) => ticket.projectTitle
        },
        {
            label: 'Owner',
            render: (ticket) => ticket.username,
            sortValue: (ticket) => ticket.username
        },
        {
            label: 'Status',
            render: (ticket) => ticket.completed
                ? <span className="note__status--completed">Closed</span>
                : <span className="note__status--open">Open</span>,
            sortValue: (ticket) => ticket.completed
        },
        {
            label: 'Last Update',
            render: (ticket) => new Date(ticket.updatedAt)
                .toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
            sortValue: (ticket) => ticket.updatedAt
        },
    ]

    const keyFn = (ticket) => {
        return ticket.id
    }

    const newTicketButton = (
        <Link
            to={`/dashboard/projects/${projectId}/tickets/new`}
            className="new-ticket-button">
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

        //come up with better way to display project title
        const projectTitle = filteredIds.length > 0 ? entities[filteredIds[0]]?.projectTitle : ''
        const heading = allTickets ? <h1>All Tickets</h1> : <h1>{projectTitle}</h1>

        content = (
            <>
                {heading}
                <SortableTable data={ticketsData} config={config} keyFn={keyFn} />
                {!allTickets && newTicketButton}

            </>
        )

    }
    return content
}


export default NewTicketsList
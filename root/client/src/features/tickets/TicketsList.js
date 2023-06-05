import { useGetTicketsQuery } from './ticketsApiSlice'
import Ticket from './Ticket'
import PulseLoader from 'react-spinners/PulseLoader'
import { useParams, Link } from 'react-router-dom'



const TicketsList = () => {

    const { projectId } = useParams()

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

    let content
    let projTitle

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content =
            <><p className="errmsg">{error?.data?.message}</p>
                {
                    (projectId !== 'all') && <Link to={`/dashboard/projects/${projectId}/tickets/new`} className="new-ticket-button">
                        New Ticket
                    </Link >
                }
            </>
    }

    if (isSuccess) {
        const { ids, entities } = tickets

        const filteredIds = ids.filter(ticketId => entities[ticketId].project === projectId)

        const tableContent = (projectId !== 'all')
            ? ids?.length && filteredIds.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)
            : ids.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)

        const tableClass = (projectId !== 'all')
            ? "table table--tickets"
            : "table table--tickets__all"

        if (filteredIds.length > 0) {
            const firstTicket = entities[filteredIds[0]];
            projTitle = firstTicket.projectTitle;
        }

        content = (
            <>
                <h1>{projTitle}</h1>
                <div className="list-container">
                    <table className={tableClass}>
                        <thead className="table__thead">
                            <tr>
                                <th scope="col" className="table__th note__title">Title</th>
                                {projectId === 'all' && (<th scope="col" className="table__th note__title">Project</th>)}
                                <th scope="col" className="table__th note__username">Owner</th>
                                <th scope="col" className="table__th note__status">Status</th>

                                <th scope="col" className="table__th note__updated">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                    {(projectId !== 'all') && <Link to={`/dashboard/projects/${projectId}/tickets/new`} className="new-ticket-button">
                        New Ticket
                    </Link >}
                </div>
            </>
        )
    }

    return content
}

export default TicketsList
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

        //Ticket needs additional field for the project it belongs to, which is displayed if the tickets aren't filtered
        content = (
            <div className="list-container">
                <table className="table table--tickets">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th note__title">Title</th>
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
        )
    }

    return content
}

export default TicketsList
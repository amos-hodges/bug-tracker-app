import { useGetTicketsQuery } from './ticketsApiSlice'
import Ticket from './Ticket'
import SortIndicator from '../../components/SortIndicator'
import PulseLoader from 'react-spinners/PulseLoader'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'



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

    const [sortCategory, setSortCategory] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

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

        const categoryMap = {
            title: "title",
            owner: "username",
            status: "completed",
            updated: "updatedAt",
            project: "project"
        }
        const { ids, entities } = tickets

        const filteredIds = (projectId !== 'all')
            ? ids.filter(ticketId => entities[ticketId].project === projectId)
            : ids

        const sortedIds = [...filteredIds].sort((a, b) => {
            const aValue = entities[a][categoryMap[sortCategory]]
            const bValue = entities[b][categoryMap[sortCategory]]
            if (sortOrder === "asc") {
                if (aValue < bValue) return -1
                if (aValue > bValue) return 1
                return 0
            } else {
                if (bValue < aValue) return -1
                if (bValue > aValue) return 1
                return 0
            }
        })

        const filteredAndSortedIds = sortedIds.filter((ticketId) => {
            const ticket = entities[ticketId]
            if (!ticket) {
                return false
            }
            return (
                (projectId === 'all' &&
                    (ticket.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.username.toLowerCase().includes(searchQuery.toLowerCase()))) ||
                (projectId !== 'all' &&
                    (ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        ticket.username.toLowerCase().includes(searchQuery.toLowerCase())))
            )
        })

        const tableContent = filteredAndSortedIds.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)

        const tableClass = (projectId !== 'all')
            ? "table table--tickets"
            : "table table--tickets__all"

        if (filteredIds.length > 0) {
            const firstTicket = entities[filteredIds[0]]
            projTitle = firstTicket.projectTitle
        }

        const handleSort = (category) => {
            if (sortCategory === category) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            } else {
                setSortCategory(category)
                setSortOrder("asc")
            }
        }

        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value)
        }

        content = (
            <>
                <h1>{projTitle}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className="list-container">
                    <table className={tableClass}>
                        <thead className="table__thead">
                            <tr>
                                <th scope="col" className="table__th note__title"
                                    onClick={() => handleSort("title")}>
                                    Title
                                    {sortCategory === "title" && <SortIndicator order={sortOrder} />}
                                </th>

                                {projectId === 'all' &&
                                    (<th scope="col" className="table__th note__title"
                                        onClick={() => handleSort("project")}>
                                        Project
                                        {sortCategory === "project" && <SortIndicator order={sortOrder} />}
                                    </th>)}

                                <th scope="col" className="table__th note__username"
                                    onClick={() => handleSort("owner")}>
                                    Owner
                                    {sortCategory === "owner" && <SortIndicator order={sortOrder} />}
                                </th>

                                <th scope="col" className="table__th note__status"
                                    onClick={() => handleSort("status")}>
                                    Status
                                    {sortCategory === "status" && <SortIndicator order={sortOrder} />}
                                </th>

                                <th scope="col" className="table__th note__updated"
                                    onClick={() => handleSort("updated")}>
                                    Updated
                                    {sortCategory === "updated" && <SortIndicator order={sortOrder} />}
                                </th>
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

import { useGetTicketsQuery } from './ticketsApiSlice'
import Ticket from './Ticket'
import PulseLoader from 'react-spinners/PulseLoader'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import SortableTable from '../../components/SortableTable'

const NewTicketsList = () => {
    const { projectId } = useParams()

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

    // const handleSearchInputChange = (e) => {
    //     setSearchQuery(e.target.value)
    // }

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
            render: (ticket) => ticket.completed ? 'True' : 'False',
            sortValue: (ticket) => ticket.completed
        },
        {
            label: 'Last Update',
            render: (ticket) => ticket.updatedAt,
            sortValue: (ticket) => ticket.updatedAt
        },
    ]

    const keyFn = (ticket) => {
        return ticket.id
    }

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <><p className="errmsg">{error?.data?.message}</p></>
    }

    if (isSuccess) {
        const ticketsData = Object.values(tickets.entities).map(entity => ({ ...entity }))

        content = (
            <>
                {/* <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                /> */}
                <div>
                    <SortableTable data={ticketsData} config={config} keyFn={keyFn} />
                </div>
            </>
        )

    }
    return content
}


export default NewTicketsList
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { memo } from 'react'

//Need to add fields for priortity and current user
//Need to change content to handle importance

const Ticket = ({ ticketId }) => {
    const { ticket } = useGetTicketsQuery('ticketsList', {
        selectFromResult: ({ data }) => ({
            ticket: data?.entities[ticketId]
        })
    })
    console.log(ticket.projectTitle)
    const { projectId } = useParams()

    const navigate = useNavigate()

    if (ticket) {

        const updated = new Date(ticket.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', })

        const handleOpen = () => navigate(`/dashboard/projects/${projectId}/tickets/${ticketId}`)

        return (
            <tr className="table__row">
                <td className={`table__cell`}>
                    <button
                        className={`ticket-title ${ticket.importance.toLowerCase()}`}
                        onClick={handleOpen}
                    >
                        {ticket.title}
                    </button>
                </td>

                <td className="table__cell note__username">{ticket.username}</td>
                <td className="table__cell note__status">
                    {ticket.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>

                <td className="table__cell note__updated">{updated}</td>

            </tr>
        )
    } else return null
}

const memoizedTicket = memo(Ticket)

export default memoizedTicket
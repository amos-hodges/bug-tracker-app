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

    const projectId = useParams()
    //console.log(projectId.projectId)
    const navigate = useNavigate()

    if (ticket) {
        const created = new Date(ticket.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(ticket.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dashboard/projects/${projectId.projectId}/tickets/${ticketId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {ticket.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{ticket.title}</td>
                <td className="table__cell note__username">{ticket.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedTicket = memo(Ticket)

export default memoizedTicket
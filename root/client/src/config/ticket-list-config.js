
export const ticketListConfig = [
    {
        label: 'Title',
        render: (ticket) => <div className="ticket-link">{ticket.title}</div>,
        sortValue: (ticket) => ticket.title,
        link: (ticket) => `/dashboard/projects/${ticket.project}/tickets/${ticket.id}`
    },
    {
        label: 'Importance',
        render: (ticket) => <div
            className={`importance ${ticket.importance.toLowerCase()}`}>
            {ticket.importance}</div>,
        sortValue: (ticket) => ticket.importance
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
            ? <p className="status completed">Closed</p>
            : <p className="status open">Open</p>,
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

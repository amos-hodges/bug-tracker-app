export const ticketListConfig = [
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
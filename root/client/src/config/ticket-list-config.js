//for alphabetical sorting
const priorityMap = {
    Critical: 'Critical',
    High: 'High',
    Medium: 'Intermediate',
    Low: 'Low',
    Lowest: 'Lowest'
}

export const ticketListConfig = [
    {
        label: 'Title',
        render: (ticket) => <div className="ticket-link text_overflow">{ticket.title}</div>,
        sortValue: (ticket) => ticket.title,
        searchValue: (ticket) => ticket.title,
        link: (ticket) => `/dashboard/projects/${ticket.project}/tickets/${ticket.id}`
    },
    {
        label: 'Priority',
        render: (ticket) => <div
            className={`importance ${ticket.importance.toLowerCase()}`}>
            {ticket.importance}</div>,
        sortValue: (ticket) => priorityMap[ticket.importance],
        searchValue: (ticket) => ticket.importance
    },
    {
        label: 'Project',
        render: (ticket) => ticket.projectTitle,
        sortValue: (ticket) => ticket.projectTitle,
        searchValue: (ticket) => ticket.projectTitle
    },
    {
        label: 'Owner',
        render: (ticket) => ticket.username,
        sortValue: (ticket) => ticket.username,
        searchValue: (ticket) => ticket.username
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
        sortValue: (ticket) => ticket.updatedAt,
        searchValue: (ticket) => {
            const searchString = new Date(ticket.updatedAt).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long'
            })
            return searchString
        }
    },
    {
        label: 'Due On',
        render: (ticket) => new Date(ticket.dueDate)
            .toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            }),
        sortValue: (ticket) => ticket.dueDate,
        searchValue: (ticket) => {
            const searchString = new Date(ticket.dueDate).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long'
            })
            return searchString
        }
    },
    {
        label: 'Status',
        render: (ticket) => ticket.completed
            ? <p className="status completed">Closed</p>
            : <p className="status open">In Progress</p>,
        sortValue: (ticket) => ticket.completed,
        searchValue: (ticket) => ticket.completed,

    },
]

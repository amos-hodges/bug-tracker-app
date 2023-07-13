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

export const ticketListClasses = {
    //     tableClass: "table table--tickets__all",
    //     tableHeadClass: "table__thead",
    //     cellClass: "table__cell",
    //     rowClass: "table__row"
    // }
    tableClass: "",
    tableHeadClass: "",
    cellClass: "",
    rowClass: ""
}
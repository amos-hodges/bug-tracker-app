export const projectListConfig = [
    {
        label: 'Project',
        render: (project) => project.title,
        sortValue: (project) => project.title,
        link: (project) => `/dashboard/projects/${project.id}/tickets`
    },
    {
        label: 'Description',
        render: (project) => project.description
    },
    {
        label: 'Created',
        render: (project) => new Date(project.createdAt)
            .toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            }),
        sortValue: (project) => project.createdAt
    },
    {
        label: 'Last Modified',
        render: (project) => new Date(project.updatedAt)
            .toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            }),
        sortValue: (project) => project.updatedAt
    },
    {
        label: 'Tickets',
        render: (project) => project.ticketCount,
        sortValue: (project) => project.ticketCount
    },
    {
        label: 'Active Employees',
        render: (project) => project.userCount,
        sortValue: (project) => project.userCount
    },
]
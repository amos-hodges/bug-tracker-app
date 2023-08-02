export const projectListConfig = [
    {
        label: 'Project',
        render: (project) => <div className="list-link text_overflow">{project.title}</div>,
        sortValue: (project) => project.title,
        searchValue: (project) => project.title,
        link: (project) => `/dashboard/projects/${project.id}/tickets`
    },
    {
        label: 'Description',
        render: (project) => <div className="text_overflow">{project.description}</div>,
        searchValue: (project) => project.description
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
        sortValue: (project) => project.updatedAt,
        searchValue: (project) => project.updatedAt.toString()
    },
    {
        label: 'Tickets',
        render: (project) => project.ticketCount,
        sortValue: (project) => project.ticketCount,
        searchValue: (project) => project.ticketCount
    },
    {
        label: 'Active Employees',
        render: (project) => <div key={project.id} className="shared-cell">
            {project.userCount}
            <div className="button-18">View Team</div>
        </div>,
        sortValue: (project) => project.userCount,
        searchValue: (project) => project.userCount,
        link: (project) => `/dashboard/team/${project.id}`
    },
]
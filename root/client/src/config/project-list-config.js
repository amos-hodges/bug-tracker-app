export const projectListConfig = [
    {
        label: 'Project',
        render: (project) => <div className="list-link">{project.title}</div>,
        sortValue: (project) => project.title,
        link: (project) => `/dashboard/projects/${project.id}/tickets`
    },
    {
        label: 'Description',
        render: (project) => project.description
    },
    // {
    //     label: 'Created',
    //     render: (project) => new Date(project.createdAt)
    //         .toLocaleString('en-US', {
    //             day: 'numeric',
    //             month: 'long',
    //             hour: 'numeric',
    //             minute: 'numeric',
    //         }),
    //     sortValue: (project) => project.createdAt
    // },
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
        render: (project) => <div key={project.id} className="shared-cell">
            {project.userCount}
            <div className="button-18">View Team</div>
        </div>,
        sortValue: (project) => project.userCount,
        link: (project) => `/dashboard/team/${project.id}`
    },
]
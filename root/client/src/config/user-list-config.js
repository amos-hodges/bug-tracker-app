export const userListConfig = [
    {
        label: 'Username',
        render: (user) => user.username,
        sortValue: (user) => user.username
    },
    {
        label: 'Role',
        render: (user) => user.roles[0],
        sortValue: (user) => user.roles[0]
    },
    {
        label: 'Current Projects',
        render: (user) => user.projectTitles.map((title) => {
            return <div className="button-18">{title}</div>
        }),
        sortValue: (user) => user.projectTitles.length
    },
]

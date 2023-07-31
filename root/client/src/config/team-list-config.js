export const teamListConfig = [
    {
        label: 'Username',
        render: (user) => <div className="list-link">{user.username}</div>,
        sortValue: (user) => user.username,
        link: (user) => user
    },
    {
        label: 'Role',
        render: (user) => user.roles[0],
        sortValue: (user) => user.roles[0]
    },
    {
        label: 'Current Projects',
        render: (user) => user.projectTitles.map((title) => {
            return <div key={title} className="button-18 row-options">{title}</div>
        }),
        sortValue: (user) => user.projectTitles.length
    },
]

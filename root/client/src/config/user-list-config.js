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
        render: (user) => user.projectTitles,
        sortValue: (user) => user.projectTitles
    },
]

export const userListClasses = {
    tableClass: "table table--users",
    tableHeadClass: "table__thead",
    cellClass: "table__cell",
    rowClass: "table__row user"
}
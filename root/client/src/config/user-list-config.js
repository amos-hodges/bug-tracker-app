import { GoPencil, GoPersonFill } from "react-icons/go"

export const userListConfig = [
    {
        label: 'User',
        render: (user) => {
            const status = user.active ? '' : 'inactive'
            return <div className={`list-link team-page ${status}`}>
                <div className="profile_thumb"><GoPersonFill className="profile_img" /></div>
                <span className="username text_overflow">
                    {user.username}
                </span>
                <GoPencil />
            </div>
        },
        sortValue: (user) => user.username,
        searchValue: (user) => user.username,
        link: (user) => `/dashboard/users/${user.id}`
    },
    {
        label: 'Role',
        render: (user) => user.roles[0],
        sortValue: (user) => user.roles[0],
        searchValue: (user) => user.roles[0]
    },
    {
        label: 'Current Projects',
        render: (user) => user.projectTitles.map((title) => {
            return <div key={title} className="button-18 row-options">{title}</div>
        }),
        sortValue: (user) => user.projectTitles.length,
        searchValue: (user) => user.projectTitles.length,
    },
]

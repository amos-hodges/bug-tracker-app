import { useGetUsersQuery } from './usersApiSlice'
import { Link } from 'react-router-dom'
import SortIndicator from '../../components/SortIndicator'
import User from './User'
import PulseLoader from 'react-spinners/PulseLoader'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        //every 15 seconds
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const { isAdmin, isManager } = useAuth()

    let content

    const [sortCategory, setSortCategory] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const categoryMap = {
            username: "username",
            roles: "roles",
            projects: "projectTitles"
        }

        const { ids, entities } = users

        const sortedIds = [...ids].sort((a, b) => {
            const aValue = entities[a][categoryMap[sortCategory]]
            const bValue = entities[b][categoryMap[sortCategory]]

            if (sortOrder === "asc") {
                if (aValue < bValue) return -1
                if (aValue > bValue) return 1
                return 0
            } else {
                if (bValue < aValue) return -1
                if (bValue > aValue) return 1
                return 0
            }
        })

        const filteredAndSortedIds = sortedIds.filter((userId) => {
            const user = entities[userId]
            if (!user) {
                return false
            }
            return (
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.roles.some((role) => role.toLowerCase().includes(searchQuery.toLowerCase())) ||
                user.projectTitles.some((title) => title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        })

        const tableContent = filteredAndSortedIds?.length && filteredAndSortedIds.map(userId => <User key={userId} userId={userId} />)

        const handleSort = (category) => {
            if (sortCategory === category) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            } else {
                setSortCategory(category)
                setSortOrder("asc")
            }
        }

        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value)
        }

        content = (
            <>
                <div className="form__title-row">
                    <h2>User Settings</h2>
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className="list-container">

                    <table className="table table--users">
                        <thead className="table__head">
                            <tr>
                                <th scope="col" className="table__th user__username"
                                    onClick={() => handleSort("username")}>
                                    Username
                                    {sortCategory === "username" && <SortIndicator order={sortOrder} />}
                                </th>
                                <th scope="col" className="table__th user__roles"
                                    onClick={() => handleSort("roles")}>
                                    Roles
                                    {sortCategory === "roles" && <SortIndicator order={sortOrder} />}
                                </th>
                                <th scope="col" className="table__th user__roles"
                                    onClick={() => handleSort("projects")}>
                                    Current Projects
                                    {sortCategory === "projects" && <SortIndicator order={sortOrder} />}
                                </th>
                                <th scope="col" className="table__th user__edit">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                    {isAdmin && <Link to={'/dashboard/users/new'} className="new-ticket-button">
                        New User
                    </Link >}
                    {isManager && <button className='new-ticket-button'>Admin Request</button>}
                </div>
            </>
        )
    }
    return content
}

export default UsersList
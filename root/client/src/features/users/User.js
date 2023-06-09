import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

//eventually add sorting by user or project, add "connect" button to initaite message
const User = ({ userId }) => {

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate()

    if (user) {

        const handleEdit = () => navigate(`/dashboard/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')
        const userProjectsString = user.projectTitles.length
            ? user.projectTitles.toString().replaceAll(',', ', ')
            : 'None'

        const cellStatus = user.active ? '' : 'table__cell--inactive'
        //eventually display profile pic next to usernames
        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>{userProjectsString}</td>

                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser
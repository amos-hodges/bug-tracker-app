import { useGetUsersQuery } from './usersApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import useAuth from '../../hooks/useAuth'
import { userListConfig } from '../../config/user-list-config'
import SortableTable from '../../components/SortableTable'
const UsersList = () => {

    const { isAdmin, isManager } = useAuth()
    const config = userListConfig
    const navigate = useNavigate()
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

    const keyFn = (user) => {
        return user.id
    }

    const navFn = (link) => {
        navigate(link)
    }
    const adminRequestButton = (
        <Link to={'/dashboard/users/request'}
            className="button-18">
            Admin Request
        </Link >
    )

    const newUserButton = (
        <Link to={'/dashboard/users/new'}
            className="button-18">
            New User
        </Link >
    )
    const buttonToPass = (
        isAdmin
            ? newUserButton
            : isManager
                ? adminRequestButton
                : null
    )

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = users

        const userData = ids.map((id) => entities[id])

        const header = <h1>User Settings</h1>

        content = (
            <div className="table__container">
                <SortableTable
                    header={header}
                    button={buttonToPass}
                    data={userData}
                    config={config}
                    keyFn={keyFn}
                    navFn={navFn}
                />
            </div>
        )
    }
    return content
}

export default UsersList
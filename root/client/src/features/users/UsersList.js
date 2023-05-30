import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import PulseLoader from 'react-spinners/PulseLoader'

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

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)


        content = (
            <>
                <div className="form__title-row">
                    <h2>User Settings</h2>
                </div>
                <table className="table table--users">
                    <thead className="table__head">
                        <tr>
                            <th scope="col" className="table__th user__username">
                                Username
                            </th>
                            <th scope="col" className="table__th user__roles">
                                Roles
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
            </>
        )
    }
    return content
}

export default UsersList
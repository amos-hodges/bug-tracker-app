import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) content = <p>Loading ...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
        console.log(content)
    }

    if (isSuccess) {
        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userID={userId} />)
            : null

        content = (
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
        )
    }
    return content
}

export default UsersList
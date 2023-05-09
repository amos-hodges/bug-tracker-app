//unlike new user form, tickets need existing data to be created
import NewTicketForm from './NewTicketForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'


const NewTicket = () => {
    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!users.length) return <PulseLoader color={'#FFF'} />

    const content = <NewTicketForm users={users} />

    return content
}

export default NewTicket
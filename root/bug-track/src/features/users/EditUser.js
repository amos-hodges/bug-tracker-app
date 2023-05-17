import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {
    const { id } = useParams()

    const { user } = useGetUsersQuery('userList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    const { projects } = useGetProjectsQuery('projectsList', {
        selectFromResult: ({ data }) => ({
            projects: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!user || !projects) return <PulseLoader color={'#FFF'} />

    const content = <EditUserForm user={user} projects={projects} />

    return content
}

export default EditUser
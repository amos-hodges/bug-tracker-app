import { useParams } from 'react-router-dom'
import EditProjectForm from './EditProjectForm'
import { useGetProjectsQuery } from './projectsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditProject = () => {
    const { id } = useParams()

    const { project } = useGetProjectsQuery('projectList', {
        selectFromResult: ({ data }) => ({
            project: data?.entities[id]
        })
    })

    if (!project) return <PulseLoader color={'#FFF'} />

    const content = <EditProjectForm project={project} />

    return content
}

export default EditProject
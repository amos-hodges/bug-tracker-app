import PulseLoader from 'react-spinners/PulseLoader'
import { useGetProjectsQuery } from './projectsApiSlice'
import { useNavigate } from 'react-router-dom'

import Grid from '../../components/Grid'
const ProjectGrid = ({ header, date }) => {

    const navigate = useNavigate()

    const {
        data: projects,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProjectsQuery('projectsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const keyFn = (project) => {
        return project.id
    }

    const navFn = (id) => {
        navigate(`/dashboard/projects/${id}/tickets`)
    }

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = projects
        const projectData = ids.map((id) => entities[id])


        content = (
            <div className="table__container">
                <section className="page-header">
                    {header}
                    {date}
                </section>
                <Grid data={projectData} keyFn={keyFn} navFn={navFn} />
            </div>
        )
    }

    return content
}

export default ProjectGrid
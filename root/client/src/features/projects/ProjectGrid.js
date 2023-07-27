import PulseLoader from 'react-spinners/PulseLoader'
import { useGetProjectsQuery } from './projectsApiSlice'
import Grid from '../../components/Grid'
const ProjectGrid = () => {

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

    // const keyFn = (project) => {
    //     return project.id
    // }

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = projects
        const projectData = ids.map((id) => entities[id])
        const header = <h1>Projects</h1>
        content = (
            <div className="table__container">
                <section className="page-header">
                    {header}
                </section>
                <Grid data={projectData} />
            </div>
        )
    }

    return content
}

export default ProjectGrid
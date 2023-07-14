import PulseLoader from 'react-spinners/PulseLoader'
import { useGetProjectsQuery } from './projectsApiSlice'
import ExpandableCard from '../../components/ExpandableCard'
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

    const keyFn = (project) => {
        return project.id
    }

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = projects

        gridcontent =  
    }

    return <div className="card-grid">{content}</div> >
}

export default ProjectGrid
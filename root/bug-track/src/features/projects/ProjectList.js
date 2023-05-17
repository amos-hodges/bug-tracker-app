import { useGetProjectsQuery } from './projectsApiSlice'
import Project from './Project'
//import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const ProjectList = () => {
    //eventually filter based on roles
    // const { username, isManager, isAdmin } = useAuth()

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

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        //add entities for filtering
        const { ids } = projects

        //limit visible tickets to current user unless admin or manager
        //will modify to accomdate employees working on the same project, tickets assigned to groups etc
        // let filteredIds
        // if (isManager || isAdmin) {
        //     filteredIds = [...ids]
        // } else {
        //     filteredIds = ids.filter(projectId => entities[projectId].username === username)
        // }

        // const tableContent = ids?.length && filteredIds.map(projectId => <Project key={projectId} projectId={projectId} />)

        const tableContent = ids?.length && ids.map(projectId => <Project key={projectId} projectId={projectId} />)

        content = (
            <table className="table table--projects">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__title">Project</th>
                        <th scope="col" className="table__th note__title">Description</th>
                        <th scope="col" className="table__th note__title">Created</th>
                        <th scope="col" className="table__th note__title">Last Update</th>
                        <th scope="col" className="table__th note__title">Tickets</th>
                        <th scope="col" className="table__th note__title">Active Employees</th>
                        <th scope="col" className="table__th note__edit">Edit</th>
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

export default ProjectList

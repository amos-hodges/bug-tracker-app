import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import Project from './Project'
import PulseLoader from 'react-spinners/PulseLoader'

const ProjectList = () => {


    const { userId, isManager, isAdmin } = useAuth()

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

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

        const { ids } = projects
        //Only display assigned projects for employees, do not allow employees to edit a project
        const filteredProjectIds = (isAdmin || isManager)
            ? ids
            : user?.projects || [];

        const tableContent = filteredProjectIds.length > 0 ? (
            filteredProjectIds.map(projectId => (
                <Project key={projectId} projectId={projectId} hideEdit={isAdmin || isManager} />
            ))
        ) : (
            <tr>
                <td colSpan="6">No projects found.</td>
            </tr>
        );

        const tableClass = isAdmin || isManager ? "table table--projects" : "table table--projects__noEdit"
        const editColumn = isAdmin || isManager ? (
            <th scope="col" className="table__th note__edit">Edit</th>
        ) : null


        content = (
            <table className={tableClass}>
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th note__title">Project</th>
                        <th scope="col" className="table__th note__title">Description</th>
                        <th scope="col" className="table__th note__title">Created</th>
                        <th scope="col" className="table__th note__title">Last Update</th>
                        <th scope="col" className="table__th note__title">Tickets</th>
                        <th scope="col" className="table__th note__title">Active Employees</th>
                        {editColumn}
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

import { useGetProjectsQuery } from './projectsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import SortableTable from '../../components/SortableTable'
import { projectListConfig } from '../../config/project-list-config'
const ProjectList = () => {

    const { userId, isManager, isAdmin } = useAuth()
    const navigate = useNavigate()
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId],
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

    const keyFn = (ticket) => {
        return ticket.id
    }

    const navFn = (link) => {
        navigate(link)
    }
    let content

    const newProjectButton = (isAdmin || isManager ? (
        <Link
            to={`/dashboard/projects/new`}
            className="button-18">
            New Project
        </Link >
    ) : null)

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = projects

        //Only display assigned projects for employees
        const filteredProjectIds = (isAdmin || isManager)
            ? ids
            : user?.projects || []

        const projectsData = filteredProjectIds.map((id) => entities[id])
        const header = <h1>Projects</h1>

        content = (
            <div className="table__container">
                <SortableTable
                    header={header}
                    button={newProjectButton}
                    data={projectsData}
                    config={projectListConfig}
                    keyFn={keyFn}
                    navFn={navFn}
                />
            </div>
        )
    }
    return content
}

export default ProjectList

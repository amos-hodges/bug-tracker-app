import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import useAuth from '../../hooks/useAuth'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import SortableTable from '../../components/SortableTable'
import { userListConfig } from '../../config/user-list-config'
const Team = () => {

    const { userId, isAdmin, isManager } = useAuth()

    const { projectId } = useParams()
    const allProjects = (projectId === 'all')

    const { data: projects,
        isLoading: isProjectLoading,
        isSuccess: isProjectSuccess,
        isError: isProjectError
    } = useGetProjectsQuery('projectsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const handleMessageClicked = (username) => {
        //TO-DO
        console.log(`messaging ${username}`)
    }

    const keyFn = (user) => {
        return user.id
    }

    let content

    if (isLoading || isProjectLoading) content = <PulseLoader color={"#FFF"} />

    if (isError || isProjectError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess && isProjectSuccess) {

        const { ids, entities } = users
        const { ids: projIds, entities: projEntities } = projects
        //-all users when viewing from all projects
        //-only users asigned to project when viewing from a specific project
        const teamIds = ids.filter((id) => {
            const notCurrentUser = id !== userId
            const userAssignedProject = entities[id].projects.includes(projectId)
            return notCurrentUser && (allProjects || userAssignedProject)
        })

        const teamData = teamIds.map((id) => entities[id])

        const header = <h1>{`Team for ${projEntities[projectId]?.title}`}</h1>

        content = (
            <div className="table__container">
                <SortableTable
                    header={header}
                    data={teamData}
                    config={userListConfig}
                    keyFn={keyFn}
                />
            </div>
        )
    }

    return content
}

export default Team
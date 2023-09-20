import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from './usersApiSlice'
import { useGetProjectsQuery } from '../projects/projectsApiSlice'
import useAuth from '../../hooks/useAuth'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../../components/Modal'
import ModifyTeamForm from './ModifyTeamForm'
import SortableTable from '../../components/SortableTable'
import { teamListConfig } from '../../config/team-list-config'
const Team = () => {

    const { userId, isAdmin, isManager } = useAuth()

    const { projectId } = useParams()
    const allProjects = (projectId === 'all')

    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)

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

    const handleModifyClicked = () => {
        setIsModalOpen(!isModalOpen)
    }

    const keyFn = (user) => {
        return user.id
    }

    const navFn = (user) => {
        handleMessageClicked(user.username)
    }

    // const modifyTeamButton = (
    //     <Link to={'/dashboard/users/new'}
    //         className="button-18">
    //         Modify
    //     </Link >
    // )
    const modifyTeamButton = (
        <div
            className="button-18"
            onClick={handleModifyClicked}
        >
            Modify
        </div>
    )



    const buttonToPass = (
        (isAdmin || isManager)
            ? modifyTeamButton
            : null
    )

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
        const userData = ids.map((id) => entities[id])
        const teamData = teamIds.map((id) => entities[id])
        const modalContent = isModalOpen && (
            <Modal
                className={"team-selection"}
                timeOut={500000}
                onClose={handleModifyClicked}>
                {/* <ModifyTeamForm users={teamData} /> */}
                <ModifyTeamForm users={userData} />
            </Modal>
        )
        const header = (
            allProjects ?
                <h1>Teams</h1>
                : <h1>{`Team for ${projEntities[projectId]?.title}`}</h1>
        )

        content = (
            <>

                <div className="table__container">

                    <SortableTable
                        header={header}
                        headerContent={modalContent}
                        button={buttonToPass}
                        data={teamData}
                        config={teamListConfig}
                        keyFn={keyFn}
                        navFn={navFn}
                    />
                </div>
            </>
        )
    }

    return content
}

export default Team
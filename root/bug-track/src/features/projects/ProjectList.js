import Project from './Project'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const ProjectList = () => {
    const { username, isManager, isAdmin } = useAuth()

    //Query here
    // ....

    let content

    // if (isLoading) content = <PulseLoader color={"#FFF"} />

    // if (isError) {
    //     content = <p className="errmsg">{error?.data?.message}</p>
    // }

    // if (isSuccess) {
    //     const { ids, entities } = projects

    //     //limit visible tickets to current user unless admin or manager
    //     //will modify to accomdate employees working on the same project, tickets assigned to groups etc
    //     let filteredIds
    //     if (isManager || isAdmin) {
    //         filteredIds = [...ids]
    //     } else {
    //         filteredIds = ids.filter(ticketId => entities[ticketId].username === username)
    //     }

    //     const tableContent = ids?.length && filteredIds.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)

    content = (
        <table className="table table--notes">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th note__status">Project</th>
                    <th scope="col" className="table__th note__created">Description</th>
                    <th scope="col" className="table__th note__updated">Created</th>
                    <th scope="col" className="table__th note__title">Last Update</th>
                    <th scope="col" className="table__th note__username">Tickets</th>
                    <th scope="col" className="table__th note__edit">Active Employees</th>
                </tr>
            </thead>
            <tbody>
                <p>Will contain projects</p>
                {/* {tableContent} */}
            </tbody>
        </table>
    )
    //}
    return content
}

export default ProjectList

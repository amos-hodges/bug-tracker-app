import UserCheckbox from "./userCheckbox"

const ModifyTeamForm = ({ users, projectId }) => {
    console.log(users)
    const toggleUser = (userId) => {
        console.log('adding ' + userId)
    }


    const teamOptions = users.map((user) => (
        <label key={user.id} className="checkbox-label">
            <input
                type="checkbox"
                value={user.id}
                checked={user.projects.includes(projectId)}
                onChange={() => toggleUser(user.id)} />{' '}
            {user.username}
        </label>
    ))

    const content = <div>
        {teamOptions}
    </div>
    return content
}

export default ModifyTeamForm
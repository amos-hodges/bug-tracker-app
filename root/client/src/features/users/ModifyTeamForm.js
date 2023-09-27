import { useState, useEffect } from "react"
import { useUpdateUserMutation } from "./usersApiSlice"
const ModifyTeamForm = ({ users, projectId }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()


    console.log(users)
    const toggleUser = (userId) => {

    }


    const teamOptions = users.map((user) => {

        console.log(user.username + user.projects.includes(projectId.toString()))
        return (
            <label key={user.id} className="checkbox-label">
                <input
                    type="checkbox"
                    value={user.id}
                    checked={user.projects.includes(projectId)}
                    onChange={() => toggleUser(user.id)} />{' '}
                {user.username}
            </label>
        )
    })

    const content = <div>
        {teamOptions}
    </div>
    return content
}

export default ModifyTeamForm
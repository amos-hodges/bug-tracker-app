import { useUpdateUserMutation } from "./usersApiSlice"
import { useState } from "react"

const UserCheckbox = ({ user, projectId }) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [checked, setChecked] = useState(false)

    const toggleCheckbox = () => {

        setChecked(!checked);
        //Need to correctly add/remove projectId from projects array
        updateUser({ username: user.username, projectId: 'projectId' })
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={checked} onChange={toggleCheckbox} />
                {user.username}
            </label>
        </div>
    )
}

export default UserCheckbox
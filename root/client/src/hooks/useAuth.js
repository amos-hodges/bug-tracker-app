import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    let isManager = false
    let isAdmin = false
    let status = 'Employee'

    if (token) {
        const decoded = jwtDecode(token)

        const { username, roles, _id } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if (isManager) status = 'Manager'
        //admin highest status
        if (isAdmin) status = 'Admin'

        return { username, roles, userId: _id, status, isManager, isAdmin }
    }
    return { username: '', roles: [], userId: '', status, isManager, isAdmin }
}

export default useAuth
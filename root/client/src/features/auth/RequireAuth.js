import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()
    // replaces current entry in the history stack with the new one
    // prevents back button from requiring login once user is logged in
    // only shows pages if any of the roles are present
    const content = (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )

    return content
}

export default RequireAuth
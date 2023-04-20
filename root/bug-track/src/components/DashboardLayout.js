import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'

//layout component for protected portion of app
const DashboardLayout = () => {
    return (
        <>
            <DashboardHeader />
            <div className='dash-container'>
                <Outlet />
            </div>
            <DashboardFooter />
        </>
    )
}

export default DashboardLayout
import { Outlet } from 'react-router-dom'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'
import Sidebar from './Sidebar'

//layout component for protected portion of app
const DashboardLayout = () => {
    return (
        <>
            <DashboardHeader />
            <div className='dash-container'>
                <Sidebar />
                <div className='content-container'>
                    <Outlet />
                </div>
            </div>
            <DashboardFooter />
        </>
    )
}

export default DashboardLayout
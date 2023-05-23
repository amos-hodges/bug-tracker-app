import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'
import Sidebar from './Sidebar'

//layout component for protected portion of app
const DashboardLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    let containerClass = !isSidebarOpen ? 'dash-container' : 'dash-container-sidebar container-closed'

    return (
        <>

            <DashboardHeader
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => toggleSidebar()} />
            <div className="content-container">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className={containerClass}>

                    <Outlet />
                </div>

            </div>
            <DashboardFooter />

        </>
    )
}

export default DashboardLayout
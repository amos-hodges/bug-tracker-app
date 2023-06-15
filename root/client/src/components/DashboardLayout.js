import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardFooter from './DashboardFooter'
import Sidebar from './Sidebar'

//layout component for protected portion of app
const DashboardLayout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Retrieve the previous state from local storage or use the default value
        const storedState = localStorage.getItem('sidebarToggle');
        return storedState ? JSON.parse(storedState) : true;
    });

    useEffect(() => {
        // Save the sidebar toggle state to local storage whenever it changes
        localStorage.setItem('sidebarToggle', JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

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
//import { useState } from "react"
const Sidebar = ({ isSidebarOpen }) => {

    let sideBarClass = isSidebarOpen ? "sidebar" : "sidebar--open"
    console.log(sideBarClass)
    return (
        <aside className={sideBarClass}>
            <h2>Sidebar</h2>
            <p>Link 1</p>
            <p>Link 2</p>
            <p>Etc..</p>
            {/* Sidebar content */}
        </aside>
    )
}

export default Sidebar
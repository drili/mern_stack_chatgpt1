import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import { BsHouseDoor, BsList, BsCalendar, BsClock, BsPeople, BsPerson, BsGear } from 'react-icons/bs';
import SidebarLink from './navbar/SidebarLink';

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const location = useLocation()
    const currentPath = location.pathname

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='layout flex'>
            {/* // TODO: Finish sidebar */}
            {showSidebar && (
                <aside className='relative bg-indigo-50 w-1/6 min-h-screen p-4'>
                    <div className='sidebar-content fixed top-40 left-0 p-4'>
                        <span>
                            <h2>Sidebar Content</h2>
                        </span>

                        <span className='sidebarLinks'>
                            <SidebarLink
                                menuLink="/dashboard"
                                linkText="Dashboard"
                                currentPath={currentPath}
                                iconComponent={BsHouseDoor}
                            />

                            <SidebarLink
                                menuLink="/workflow"
                                linkText="Workflow"
                                currentPath={currentPath}
                                iconComponent={BsList}
                            />

                            <SidebarLink
                                menuLink="#"
                                linkText="Sprint Overview"
                                currentPath={currentPath}
                                iconComponent={BsCalendar}
                            />
                            
                            <SidebarLink
                                menuLink="#"
                                linkText="Time Registrations"
                                currentPath={currentPath}
                                iconComponent={BsClock}
                            />

                            <SidebarLink
                                menuLink="/customers"
                                linkText="Customers"
                                currentPath={currentPath}
                                iconComponent={BsPeople}
                            />

                            <SidebarLink
                                menuLink="/profile"
                                linkText="User Profile"
                                currentPath={currentPath}
                                iconComponent={BsPerson}
                            />

                            <SidebarLink
                                menuLink="#"
                                linkText="Admin"
                                currentPath={currentPath}
                                iconComponent={BsGear}
                            />
                        </span>
                    </div>
                </aside>
            )}

            <main className='w-full min-h-screen p-4'>
                <Navbar />

                {isMobile && (
                    <button
                        className='fixed bottom-4 left-4 bg-indigo-500 text-white px-3 py-1 rounded-md z-10'
                        onClick={toggleSidebar}
                    >
                        {showSidebar && isMobile ? <AiOutlineMenu /> : <AiOutlineMenu />}
                    </button>
                )}

                <section id="mainSection" className='max-w-screen-xl flex mx-auto p-4"'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Layout
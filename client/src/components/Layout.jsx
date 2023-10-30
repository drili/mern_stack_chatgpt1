import React, { useState, useContext } from 'react'
import Navbar from './Navbar'
import { Link, useLocation } from 'react-router-dom'
import { BsHouseDoor, BsList, BsCalendar, BsClock, BsPeople, BsPerson, BsGear } from 'react-icons/bs'
import SidebarLink from './navbar/SidebarLink'
import { UserContext } from '../context/UserContext'

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const { user } = useContext(UserContext)

    const location = useLocation()
    const currentPath = location.pathname

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='layout flex'>
            {showSidebar && (
                <aside className='relative bg-slate-50 w-1/6 min-h-screen p-6'>
                    <div className='sidebar-content top-40 left-0 sticky'>
                        <span>
                            <h2 className='mb-3 font-thin text-zinc-300'>Menu</h2>
                        </span>

                        <span className='sidebarLinks flex flex-col gap-2'>
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
                                menuLink="/sprint-overview"
                                linkText="Sprint Overview"
                                currentPath={currentPath}
                                iconComponent={BsCalendar}
                            />
                            
                            <SidebarLink
                                menuLink="/time-registrations"
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
                                menuLink="/admin"
                                linkText="Admin"
                                currentPath={currentPath}
                                iconComponent={BsGear}
                            />
                        </span>

                        <hr className='mt-[40px]' />

                        <div id="sidebarUser" className='flex items-center justify-center p-4 space-x-2 mt-[40px]'>
                            <img 
                                src={`http://localhost:5000/uploads/${user.profile_image}`} 
                                className='h-12 w-12 rounded-full object-cover'
                            />
                            <div>
                                <p className='font-bold text-gray-900'>@{user.username}</p>
                                <p className='font-light text-gray-600'>{user.email}</p>
                            </div>
                        </div>
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
import React, { useState } from 'react';
import Navbar from './Navbar';
import { AiOutlineMenu } from "react-icons/ai"
import { BiSolidDashboard } from "react-icons/bi"
import { GiSprint } from "react-icons/gi"
import { TbClockCheck } from "react-icons/tb"
import { PiUsersFill } from "react-icons/pi"
import { MdAdminPanelSettings } from "react-icons/md"
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='layout flex'>
            {/* // TODO: Finish sidebar */}
            {showSidebar && (
                <aside className='relative bg-indigo-50 w-1/6 min-h-screen p-4'>
                    <div className='sidebar-content fixed bottom-20 left-0 p-4'>
                        <span>
                            <h2>Sidebar Content</h2>
                        </span>

                        <span className='sidebarLinks'>
                            <Link to="/dashboard" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                <BiSolidDashboard/> Dashboard
                            </Link>

                            <Link to="/" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                <GiSprint/> Sprint Overview
                            </Link>

                            <Link to="/" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                <TbClockCheck/> Time Registrations
                            </Link>

                            <Link to="/" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                <PiUsersFill/> Customers
                            </Link>

                            <Link to="/" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                               <MdAdminPanelSettings/> Admin
                            </Link>
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
                    {showSidebar && isMobile ? <AiOutlineMenu/> : <AiOutlineMenu/>}
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
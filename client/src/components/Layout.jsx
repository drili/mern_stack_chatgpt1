import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import {  } from "react-icons/bs";

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
                    <div className='sidebar-content fixed top-40 left-0 p-4'>
                        <span>
                            <h2>Sidebar Content</h2>
                        </span>

                        <span className='sidebarLinks'>
                            <Link to="/dashboard" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                Dashboard
                            </Link>

                            <Link to="/workflow" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                Workflow
                            </Link>

                            <Link to="#" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                Sprint Overview
                            </Link>

                            <Link to="#" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                Time Registrations
                            </Link>

                            <Link to="/customers" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                Customers
                            </Link>

                            <Link to="/profile" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                               Profile
                            </Link>

                            <Link to="#" className='flex items-center gap-4 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                               Admin
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
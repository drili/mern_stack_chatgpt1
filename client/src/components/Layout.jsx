import React, { useState } from 'react';
import Navbar from './Navbar';
import { AiOutlineMenu } from "react-icons/ai"

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='layout flex'>
            {showSidebar && (
                <aside className='relative bg-indigo-50 w-1/6 min-h-screen p-4'>
                    <div className='sidebar-content fixed bottom-20 left-0 p-4'>
                        <h2>Sidebar Content</h2>
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
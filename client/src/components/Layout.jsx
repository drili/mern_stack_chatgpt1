import React, { useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='layout flex'>
            {showSidebar && (
                <aside className='bg-gray-200 w-1/5 min-h-screen p-4'>
                    <h2>Sidebar</h2>
                </aside>
            )}

            <main className='w-full min-h-screen p-4'>
                <Navbar />

                <button 
                    className='fixed bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md z-10'
                    onClick={toggleSidebar}
                >
                    {showSidebar ? "Hide sidebar" : "Show sidebar"}
                </button>

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
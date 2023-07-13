import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Navbar />

            <section id="mainSection" className='max-w-screen-xl flex mx-auto p-4"'>
                <div className='w-full'>
                    {children}
                </div>
            </section>
        </div>
    )
}

export default Layout
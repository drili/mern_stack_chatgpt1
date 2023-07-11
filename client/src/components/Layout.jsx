import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Navbar />

            <section className='container py-6'>
                {children}
            </section>
        </div>
    )
}

export default Layout
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    console.log({user});

    useEffect(() => {
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")

        setUsername(username)
        setEmail(email)
    }, user)

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');

        navigate("/login")
    }

    return (
        <nav className='navbar'>
            <div className='container'>
                <p>UserContext: {user && user.username}</p>
            </div>
            <div className='container mx-auto py-2 flex justify-between items-center'>
                <section className='flex gap-4'>
                    <Link to="/dashboard" className='font-semibold text-lg text-gray-800'>
                        Dashboard
                    </Link>

                    <Link to="/profile" className="font-semibold text-lg text-gray-800">
                        Profile
                    </Link>
                </section>

                <div className="flex items-center">
                    <span className="mr-4 text-gray-800 flex gap-2">
                        <p>@{username}</p>
                        <p className='font-bold'>{email}</p>
                    </span>
                    <button onClick={handleLogout} className="px-4 py-2 rounded text-white bg-purple-400">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
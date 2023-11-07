import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import userImage from "../assets/profile-pics/default-image.jpg"

const Navbar = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [profileImage, setProfileImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
        }

        if (!user.profile_image) {
            setProfileImage(userImage)
            setImageSrc("")

        } else {
            setProfileImage(user.profile_image)
            setImageSrc("http://localhost:5000/uploads/")
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // localStorage.clear();
        setUsername('');

        navigate("/login")
    }

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="w-full px-6 flex flex-wrap items-center justify-between mx-auto py-4">
                    <a href="#" className="flex items-left">  
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Unify</span>
                    </a>

                    <div className="flex md:order-2">
                        <span id="navbarButtons" className='flex gap-4 items-center mr-4'>
                            <Link to="/register-offtime">
                                <button type="submit" className='h-fit whitespace-nowrap button text-black bg-white border-indigo-500 hover:bg-indigo-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Register Off- & Sicktime</button>
                            </Link>

                            <Link to="/create-task">
                            <button type="submit" className='bg-indigo-500 h-fit whitespace-nowrap button text-white border-indigo-500 hover:bg-indigo-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Create Task</button>
                            </Link>
                        </span>

                        <span className='flex flex-row align-center items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                            <p className='font-bold'>@{username}</p>
                            <img 
                                className='w-[40px] h-[40px] rounded-full object-cover ml-2'
                                src={`${imageSrc}${profileImage}`} /
                                >
                        </span>
                        
                        <span className='flex items-center'>
                            <button 
                                onClick={handleLogout} 
                                type="button" 
                                className="h-fit text-black font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0">Logout</button>
                            
                            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                        </span>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        
                    </div>
                </div>
            </nav>

            <div id='navDivider' className='h-[100px]'>
            </div>
        </>
    )
}

export default Navbar
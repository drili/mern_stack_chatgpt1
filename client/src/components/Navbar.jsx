import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell } from "react-icons/fa";
import socketIoClient from 'socket.io-client';

import { UserContext } from '../context/UserContext';
import userImage from "../assets/profile-pics/default-image.jpg"

const Navbar = () => {
    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [userImg, setUserImg] = useState("")
    const [profileImage, setProfileImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)
    const navigate = useNavigate()
    const [activeYear, setActiveYear] = useState("")
    const [sprintYears, setSprintYears] = useState([])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)
    const socket = socketIoClient("http://localhost:5000")

    const { user, setUser } = useContext(UserContext)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const handleSprintYearChange = async (e) => {
        const newActiveYear = e

        try {
            const response = await axios.put(`http://localhost:5000/users/update-sprint-year`, { activeYear: newActiveYear, userId: user.id })
            setActiveYear(response.data.activeYear)

            if (user) {
                const updatedUser = { ...user, active_year: response.data.activeYear }
                setUser(updatedUser)

                localStorage.setItem("user", JSON.stringify(updatedUser))
                window.location.reload()
            }
        } catch (error) {
            console.error('Failed to update sprint year:', error);
        }
    }

    const fetchSprintYears = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sprints/fetch-sprint-years`)
            if (response.status === 200) {
                setSprintYears(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch all sprint years', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.clear();
        setUsername('');

        navigate("/login")
    }

    useEffect(() => {
        if (user) {
            setUsername(user?.username)
            setEmail(user?.email)
            setUserImg(user?.profile_image)
            setImageSrc("http://localhost:5000/uploads/")
            setActiveYear(user?.active_year)
            fetchSprintYears();
        }
    }, [user])

    useEffect(() => {
        socket.emit('register', user.id);

        socket.on('new-notification', (data) => {
            setHasUnreadNotifications(true);
            console.log("NEW NOTIFICATION");
        });

        return () => {
            socket.off('new-notification');
        };
    }, [user, socket]);

    const menuItems = (
        <>
            <span id="navbarButtons" className='flex gap-4 mt-10 flex-col w-full md:flex-row md:mr-4 md:items-center md:mt-0 md:w-auto'>
                <div>
                    <select
                        className={`${inputClasses} min-w-[100px] bg-white`}
                        defaultValue=""
                        onChange={(e) => handleSprintYearChange(e.target.value)}
                    >
                        <option value={activeYear}>{activeYear}</option>
                        {sprintYears
                            .filter((year) => year.sprintYear !== activeYear)
                            .map((year) => (
                                <option key={year._id} value={year.sprintYear}>{year.sprintYear}</option>
                            ))}
                    </select>
                </div>

                <Link to="/register-offtime">
                    <button type="submit" className='h-fit whitespace-nowrap button text-black bg-white border-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Register Off- & Sicktime</button>
                </Link>

                <Link to="/create-task">
                    <button type="submit" className='bg-rose-500 h-fit whitespace-nowrap button text-white border-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Create Task</button>
                </Link>
            </span>

            <span className='flex flex-row align-center items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mt-5 md:mt-0'>
                <p className='font-bold'>@{username}</p>
                <img
                    className='w-[40px] h-[40px] rounded-full object-cover ml-2'
                    src={`${imageSrc}${userImg}`} /
                >
            </span>

            <span className='flex items-center'>
                <Link to="/notifications">
                    <div className='mr-5 ml-1 relative hover:cursor-pointer'>
                        <FaBell className='text-slate-900' size={18} />

                        <span className='absolute top-[-3px] right-[-1px] bg-red-500 h-[10px] w-[10px] rounded-full'></span>
                    </div>
                </Link>
            </span>

            <span className='flex items-center'>
                <button
                    onClick={handleLogout}
                    type="button"
                    className="h-fit text-black font-medium rounded-md text-sm px-4 mt-5 py-2 text-center mr-3 md:mr-0 md:mt-0">Logout</button>
            </span>
        </>
    )

    return (
        <>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="w-full px-6 flex flex-wrap items-center justify-between mx-auto py-4">
                    <a href="#" className="flex items-left">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Unify</span>
                    </a>

                    <button
                        onClick={toggleMobileMenu}
                        data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded={isMobileMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="hidden md:flex md:order-2">
                        {menuItems}
                    </div>

                    <div className={`${isMobileMenuOpen ? 'flex flex-col items-end' : 'hidden'} md:hidden w-full`} id="navbar-sticky">
                        {menuItems}
                    </div>

                </div>
            </nav>

            <div id='navDivider' className='h-[100px]'>
            </div>
        </>
    )
}

export default Navbar
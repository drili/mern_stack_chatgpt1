import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { Link, useLocation } from 'react-router-dom'
import { BsHouseDoor, BsList, BsCalendar, BsClock, BsPeople, BsPerson, BsGear, BsCurrencyDollar, BsFillHeartPulseFill, BsThreeDots } from 'react-icons/bs'
import { AiOutlineMenu } from "react-icons/ai"
import SidebarLink from './navbar/SidebarLink'
import { UserContext } from '../context/UserContext'

const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const { user } = useContext(UserContext)

    const [imageSrc, setImageSrc] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [userImg, setUserImg] = useState("")

    const location = useLocation()
    const currentPath = location.pathname

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    useEffect(() => {
        if (user) {
            setImageSrc("http://localhost:5000/uploads/")
            setUsername(user.username)
            setEmail(user.email)
            setUserImg(user.profile_image)
        }

        const checkScreenWidth = () => {
            const screenWidth = window.innerWidth
            if (screenWidth <= 990) {
                setShowSidebar(false)
            } else {
                setShowSidebar(true)
            }
            
            setIsMobile(screenWidth <= 990)
        }

        checkScreenWidth()

        window.addEventListener("resize", checkScreenWidth)
        return () => window.removeEventListener('resize', checkScreenWidth)
    }, [user])

    return (
        <div className='layout flex'>
            {showSidebar && (
                // <aside className='relative bg-slate-50 w-1/6 min-h-screen p-6'>
                // <aside className={`bg-slate-50 p-6 ${isMobile ? 'fixed inset-0 z-40' : 'relative w-1/6 min-h-screen'}`}>
                <aside className={`bg-slate-50 p-6 transition-transform duration-300 ease-in-out ${isMobile ? (showSidebar ? 'fixed inset-0 z-10 translate-x-0' : 'fixed inset-0 z-10 -translate-x-full') : 'relative w-1/6 min-h-screen'}`}>
                    <div className='sidebar-content top-40 left-0 sticky'>
                        <span>
                            <h3 className='mb-3 font-thin text-zinc-300'>Main Menu</h3>
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

                            <span className='mt-[20px]'>
                                <h3 className='mb-3 font-thin text-zinc-300'>Misc</h3>

                                <SidebarLink
                                    menuLink="/admin"
                                    linkText="Admin"
                                    currentPath={currentPath}
                                    iconComponent={BsGear}
                                />

                                <SidebarLink
                                    menuLink="#"
                                    linkText="More Bizz"
                                    currentPath={currentPath}
                                    iconComponent={BsCurrencyDollar}
                                    wip={true}
                                />

                                <SidebarLink
                                    menuLink="#"
                                    linkText="Client Health"
                                    currentPath={currentPath}
                                    iconComponent={BsFillHeartPulseFill}
                                    wip={true}
                                />
                            </span>
                        </span>

                        <hr className='mt-[20px]' />

                        <div id="sidebarUser" className='flex items-center justify-center p-4 space-x-2 mt-[40px]'>
                            <img
                                // {${user.profile_image} ? src={`http://localhost:5000/uploads/${user.profile_image}` : `src=""`}
                                // src={user.profile_image ? `http://localhost:5000/uploads/${user.profile_image}` : ''}
                                src={`${imageSrc}${userImg}`}
                                className='h-12 w-12 rounded-full object-cover'
                            />
                            <div>
                                <p className='font-bold text-gray-900'>@{username}</p>
                                <p className='font-light text-gray-600 text-sm'>{email}</p>
                            </div>
                        </div>
                    </div>
                </aside>
            )}

            <main className='w-full min-h-screen p-4'>
                <Navbar />

                {isMobile && (
                    <button
                        className='fixed bottom-4 left-4 bg-slate-800 text-white p-2 rounded-full flex items-center justify-center z-40'
                        onClick={toggleSidebar}
                    >
                        {showSidebar && isMobile ? <BsThreeDots /> : <BsThreeDots />}
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
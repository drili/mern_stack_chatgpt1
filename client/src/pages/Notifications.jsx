import React from 'react'

import PageHeading from '../components/PageHeading'
import NotificationsFilter from '../components/notifications/NotificationsFilter'
import userImageDefault from "../assets/profile-pics/default-image.jpg"

const Notifications = () => {
    return (
        <div id='NotificationsPage'>
            <PageHeading
                heading="Your Notifications"
                subHeading={`Navigate through your different notifications`}
                suffix=""
            />

            <NotificationsFilter />

            <div className='grid grid-cols-3 gap-10'>
                <section id='NotificationsSections' className='border rounded-md flex flex-col col-span-2'>
                    <div className='relative flex gap-5 p-5 hover:cursor-pointer bg-slate-200 hover:bg-slate-50'>
                        <span className='block w-[10px] h-[10px] bg-blue-500 rounded-full absolute left-[15px] top-[40px]'></span>
                        <span className='flex ml-5'>
                            <img
                                src={`${userImageDefault}`}
                                className="min-w-[50px] h-[50px] object-cover rounded-md"
                            />
                        </span>

                        <span className='flex flex-col overflow-hidden mr-5'>
                            <h3 className='font-bold'>Jakob Bøgh Rasmussen</h3>
                            <span className='flex justify-between'>
                                <p className='text-sm text-slate-500 mb-2'>Mentioned you in task "taskName"</p>
                                <p className='text-sm font-bold text-slate-900 mb-2'>16:00 12-02-2024</p>
                            </span>
                            <p className='trunateCustom'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo dignissimos quas voluptatibus maxime veritatis esse soluta incidunt enim exercitationem laboriosam deserunt officia ut, ad neque sunt, earum quibusdam optio!</p>
                        </span>
                    </div>

                    <div className='relative flex gap-5 p-5 hover:cursor-pointer bg-slate-0 hover:bg-slate-50'>
                        {/* <span className='block w-[10px] h-[10px] bg-blue-500 rounded-full absolute left-[15px] top-[40px]'></span> */}
                        <span className='flex ml-5'>
                            <img
                                src={`${userImageDefault}`}
                                className="min-w-[50px] h-[50px] object-cover rounded-md"
                            />
                        </span>

                        <span className='flex flex-col overflow-hidden mr-5'>
                            <h3 className='font-bold'>Jakob Bøgh Rasmussen</h3>
                            <span className='flex justify-between'>
                                <p className='text-sm text-slate-500 mb-2'>Mentioned you in task "taskName"</p>
                                <p className='text-sm font-bold text-slate-900 mb-2'>16:00 12-02-2024</p>
                            </span>
                            <p className='trunateCustom'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo dignissimos quas voluptatibus maxime veritatis esse soluta incidunt enim exercitationem laboriosam deserunt officia ut, ad neque sunt, earum quibusdam optio!</p>
                        </span>
                    </div>

                    <div className='relative flex gap-5 p-5 hover:cursor-pointer bg-slate-0 hover:bg-slate-50'>
                        {/* <span className='block w-[10px] h-[10px] bg-blue-500 rounded-full absolute left-[15px] top-[40px]'></span> */}
                        <span className='flex ml-5'>
                            <img
                                src={`${userImageDefault}`}
                                className="min-w-[50px] h-[50px] object-cover rounded-md"
                            />
                        </span>

                        <span className='flex flex-col overflow-hidden mr-5'>
                            <h3 className='font-bold'>Jakob Bøgh Rasmussen</h3>
                            <span className='flex justify-between'>
                                <p className='text-sm text-slate-500 mb-2'>Mentioned you in task "taskName"</p>
                                <p className='text-sm font-bold text-slate-900 mb-2'>16:00 12-02-2024</p>
                            </span>
                            <p className='trunateCustom'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto nemo dignissimos quas voluptatibus maxime veritatis esse soluta incidunt enim exercitationem laboriosam deserunt officia ut, ad neque sunt, earum quibusdam optio!</p>
                        </span>
                    </div>

                </section>

                <section id='NotificationsTasks' className='col-span-1'>
                    <h2 className='font-bold mb-5'>Tasks you have recently been added to</h2>
                </section>
            </div>
        </div>
    )
}

export default Notifications
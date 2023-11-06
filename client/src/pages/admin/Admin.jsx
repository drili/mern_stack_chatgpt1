import React from 'react'
import PageHeading from '../../components/PageHeading'
import { Card } from "flowbite-react"
import { AiOutlineClockCircle, AiOutlineUsergroupAdd } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"
import { BsListTask } from "react-icons/bs"
import { Link } from 'react-router-dom'
import { HiOutlineArrowSmRight } from "react-icons/hi"

const Admin = () => {
    return (
        <div id='AdminPage'>
            <PageHeading 
                heading="Admin"
                subHeading={`Welcome to your admin page`}
                suffix="Select which feature you would like to use."
            />

            <section id='AdminCards' className='grid gap-10 grid-cols-2'>
                <Card className="h-full">
                    <div className='flex gap-4 items-center'>
                        <span>
                            <AiOutlineClockCircle size={40} color=''/>
                        </span>
                        <span>
                            <h2 class="text-lg font-bold text-gray-900">Time Registrations Overview</h2>
                            <h2 class="text-sm font-light text-zinc-500">Admin Panel View</h2>
                        </span>
                    </div>

                    <Link
                        to="time-registrations-overview" 
                        className='flex items-center align-center justify-center text-center text-black rounded-md border py-1 mt-5 border-none text-sm hover:bg-indigo-800 hover:text-white'>
                        View <HiOutlineArrowSmRight/>
                    </Link>
                </Card>

                <Card className="h-full">
                    <div className='flex gap-4 items-center'>
                        <span>
                            <FiUsers size={40}/>
                        </span>
                        <span>
                            <h2 class="text-lg font-bold text-gray-900">Persons</h2>
                            <h2 class="text-sm font-light text-zinc-500">Admin Panel View</h2>
                        </span>
                    </div>

                    <Link className='flex items-center align-center justify-center text-center text-black rounded-md border py-1 mt-5 border-none text-sm hover:bg-indigo-800 hover:text-white'>
                        View <HiOutlineArrowSmRight/>
                    </Link>
                </Card>

                <Card className="h-full">
                    <div className='flex gap-4 items-center'>
                        <span>
                            <BsListTask size={40}/>
                        </span>
                        <span>
                            <h2 class="text-lg font-bold text-gray-900">Task Vertical Overview</h2>
                            <h2 class="text-sm font-light text-zinc-500">Admin Panel View</h2>
                        </span>
                    </div>

                    <Link className='flex items-center align-center justify-center text-center text-black rounded-md border py-1 mt-5 border-none text-sm hover:bg-indigo-800 hover:text-white'>
                        View <HiOutlineArrowSmRight/>
                    </Link>
                </Card>
                
                <Card className="h-full">
                    <div className='flex gap-4 items-center'>
                        <span>
                            <AiOutlineUsergroupAdd size={40}/>
                        </span>
                        <span>
                            <h2 class="text-lg font-bold text-gray-900">Groups</h2>
                            <h2 class="text-sm font-light text-zinc-500">Admin Panel View</h2>
                        </span>
                    </div>

                    <Link className='flex items-center align-center justify-center text-center text-black rounded-md border py-1 mt-5 border-none text-sm hover:bg-indigo-800 hover:text-white'>
                        View <HiOutlineArrowSmRight/>
                    </Link>
                </Card>
            </section>
        </div>
    )
}

export default Admin
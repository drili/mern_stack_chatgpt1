import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsSearch, BsCalendarFill } from "react-icons/bs"
import { AiFillPlusCircle } from "react-icons/ai"
import { Link } from 'react-router-dom'


const PersonsOverviewFilter = () => {
    const [sprints, setSprints] = useState([])
    const [currentSprint, setCurrentSprint] = useState([])

    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    useEffect(() => {

    }, [])

    return (
        <div id='PersonsOverviewFilter' className='items-center py-4 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-row justify-between w-full outline-none focus:outline-none mb-10'>
            <section className='flex gap-4'>
            <div id="CustomersFilter-links">
                    <span className='h-full flex flex-row items-center gap-2 justify-center text-xs font-medium'>
                        <Link to="/admin/register">
                            <button type="submit" className='border border-indigo-500 h-fit whitespace-nowrap button text-black hover:bg-indigo-800 focus:ring-4 focus:outline-none hover:text-white focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Add New User</button>
                        </Link>

                        <AiFillPlusCircle size={20} color='' />
                    </span>
                </div>
            </section>

            <section className='flex justify-end gap-8'>

            </section>
        </div>
    )
}

export default PersonsOverviewFilter
import React, { useState } from 'react'
import { BsSearch, BsCalendarFill } from "react-icons/bs"

const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

const NotificationsFilter = ({ setSearchTerm, searchTerm }) => {

    const handleSearchTerm = async (e) => {
        const newSearchTerm = e.target.value
        setSearchTerm(newSearchTerm)
    }

    return (
        <div id='NotificationsFilter' className='py-4 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-col w-full outline-none focus:outline-none mb-10'>
            <section className='flex justify-end gap-8 flex-col md:flex-row'>

                <div id='WorkflowFilters-searchField'>
                    <span className='flex gap-2 items-center'>
                        <input
                            type="text"
                            className={`${inputClasses} min-w-[200px]`}
                            placeholder='Search notification(s)'
                            onChange={handleSearchTerm}
                        />
                        <BsSearch size={20}></BsSearch>
                    </span>
                </div>

            </section>
        </div>
    )
}

export default NotificationsFilter
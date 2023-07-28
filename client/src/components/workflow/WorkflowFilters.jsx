import React from 'react'
import { BsSearch, BsCalendarFill } from "react-icons/bs"
import { BiUser } from "react-icons/bi"


const WorkflowFilters = () => {
    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    return (
        <div id='WorkflowFilters' className='py-4 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-col w-full outline-none focus:outline-none mb-10'>
            <section className='flex justify-end gap-8'>
                
                {/* TODO: 
                    Add current/active sprint
                 */}
                <div id='WorkflowFilters-activeSprint'>
                    <span className='h-full flex flex-col justify-center inline-block bg-slate-500 text-white border rounded-md px-4 py-1 text-xs font-medium'>
                        Active Sprint
                    </span>
                </div>

                 {/* TODO: 
                    Add search field to filter between tasks
                 */}
                 <div id='WorkflowFilters-searchField'>
                    <span className='flex gap-2 items-center'>
                        <input 
                            type="text"
                            className={`${inputClasses} min-w-[200px]`}
                            placeholder='Search task(s)'
                        />
                        <BsSearch size={20}></BsSearch>
                    </span>
                 </div>

                 {/* TODO: 
                    Add filter by sprint
                 */}
                <div id='WorkflowFilters-filterSprint'>
                    <span className='flex gap-2 items-center'>
                        <select className={`${inputClasses} min-w-[200px]`}>
                            <option value="1">Value 1</option>
                            <option value="2">Value adjawjkd </option>
                        </select>
                        <BsCalendarFill size={20}></BsCalendarFill>
                    </span>
                </div>

                 {/* TODO: 
                    Add filter by customer
                 */}
                 <div id='WorkflowFilters-filterCustomer'>
                    <span className='flex gap-2 items-center'>
                        <select className={`${inputClasses} min-w-[200px]`}>
                            <option value="1">Customer 1</option>
                            <option value="2">Customer adjawjkd </option>
                        </select>
                        <BiUser size={20}></BiUser>
                    </span>
                </div>

            </section>
        </div>
    )
}

export default WorkflowFilters
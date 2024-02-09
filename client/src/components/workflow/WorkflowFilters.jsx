import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BsSearch, BsCalendarFill } from "react-icons/bs"
import { BiUser } from "react-icons/bi"
import { FaUserGroup } from "react-icons/fa6";

import { UserContext } from '../../context/UserContext'

const WorkflowFilters = ({ 
    activeSprint, 
    fetchTasksByUserAndSprint, 
    updateFilteredTasks, 
    updatedFilteredTasksCustomer, 
    setNewSprintArray, 
    fetchDeadlineTasks 
}) => {
    const [sprints, setSprints] = useState([])
    const [customers, setCustomers] = useState([])
    const [users, setUsers] = useState([])
    const [currentSprint, setCurrentSprint] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeFilterUser, setActiveFilterUser] = useState("")

    const { user } = useContext(UserContext)


    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const fetchSprints = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sprints/fetch?activeYear=${user.active_year}`)
            setSprints(response.data)
        } catch (error) {
            console.error('Failed to fetch sprints', error);
        }
    }

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customers/fetch")
            setCustomers(response.data)
        } catch (error) {
            console.error('Failed to fetch customers', error);
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users/fetch-active-users")
            setUsers(response.data)
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    }

    const handleUserChange = async (event) => {
        const userId = event
        fetchTasksByUserAndSprint(activeSprint, userId)
        setActiveFilterUser(userId)
    }

    const handleSprintChange = async (selectedValue) => {
        const [id, sprintName, sprintYear, sprintMonth] = selectedValue.split('|');
        const newSprintArray = { ...currentSprint }


        newSprintArray.sprintMonth = sprintMonth
        newSprintArray.sprintYear = sprintYear

        setNewSprintArray(newSprintArray);

        setCurrentSprint(newSprintArray)
        fetchTasksByUserAndSprint(newSprintArray, activeFilterUser)
        fetchDeadlineTasks(activeFilterUser, newSprintArray.sprintId)
    }

    const handleSearchTerm = async (e) => {
        const newSearchTerm = e.target.value
        setSearchTerm(newSearchTerm)
        updateFilteredTasks(newSearchTerm)
    }

    const handleCustomerChange = async (selectedValue) => {
        const [_id, customerName] = selectedValue.split('|')

        updatedFilteredTasksCustomer(customerName)
    }

    useEffect(() => {
        fetchSprints()
        fetchCustomers()
        fetchUsers()
        setCurrentSprint(activeSprint)

        setActiveFilterUser(user._id)

    }, [activeSprint])

    return (
        <div id='WorkflowFilters' className='py-4 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-col w-full outline-none focus:outline-none mb-10'>
            <section className='flex justify-end gap-8 flex-col md:flex-row'>

                <div id='WorkflowFilters-activeSprint'>
                    <span className='h-full flex flex-col justify-center bg-slate-500 text-white border rounded-md text-xs font-medium p-3'>
                        {currentSprint && currentSprint?.sprintMonth} {currentSprint && currentSprint?.sprintYear}
                    </span>
                </div>

                <div id='WorkflowFilters-searchField'>
                    <span className='flex gap-2 items-center'>
                        <input
                            type="text"
                            className={`${inputClasses} min-w-[200px]`}
                            placeholder='Search task(s)'
                            onChange={handleSearchTerm}
                        />
                        <BsSearch size={20}></BsSearch>
                    </span>
                </div>

                <div id='WorkflowFilters-filterSprint'>
                    <span className='flex gap-2 items-center'>
                        <select
                            className={`${inputClasses} min-w-[200px]`}
                            defaultValue=""
                            onChange={(e) => handleSprintChange(e.target.value)}
                        >
                            <option disabled value="">Select sprint</option>
                            {sprints && sprints.map((sprint) => (
                                <option key={sprint?._id} value={`${sprint?._id}|${sprint?.sprintName}|${sprint?.sprintYear}|${sprint.sprintMonth}`}>
                                    {sprint?.sprintName}
                                </option>
                            ))}
                        </select>
                        <BsCalendarFill size={20}></BsCalendarFill>
                    </span>
                </div>

                <div id='WorkflowFilters-filterCustomer'>
                    <span className='flex gap-2 items-center'>
                        <select
                            className={`${inputClasses} min-w-[200px]`}
                            defaultValue=""
                            onChange={(e) => handleCustomerChange(e.target.value)}
                        >
                            <option disabled value="">Select customer</option>
                            {customers.map((customer) => (
                                <option key={customer?._id} value={`${customer?._id}|${customer?.customerName}`}>{customer?.customerName}</option>
                            ))}
                        </select>
                        <FaUserGroup size={20}/>
                    </span>
                </div>

                <div id='WorkflowFilters-filterUsers'>
                    <span className='flex gap-2 items-center'>
                        <select
                            className={`${inputClasses} min-w-[200px]`}
                            defaultValue=""
                            onChange={(e) => handleUserChange(e.target.value)}
                        >
                            <option disabled value="">Select user</option>
                            {users.map((user) => (
                                <option key={user?._id} value={`${user?._id}`}>{user?.username}</option>
                            ))}
                        </select>
                        <BiUser size={20}></BiUser>
                    </span>
                </div>
            </section>
        </div>
    )
}

export default WorkflowFilters
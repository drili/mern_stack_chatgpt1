import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const TaskModalSettings = ({ labelClasses, inputClasses, taskID, fetchTaskData, fetchTasks, task, closeModal }) => {
    const [sprints, setSprints] = useState([])
    const [usersNot, setUsersNot] = useState([])
    const [taskPersons, setTaskPersons] = useState([])
    const [percentageValues, setPercentageValues] = useState({})
    const [totalPercentage, setTotalPercentage] = useState(0)
    const [errorPercentage, setErrorPercentage] = useState(false)
    const imageSrc = "http://localhost:5000/uploads/"
    const [formDataSprint, setFormDataSprint] = useState({
        taskSprintId: ""
    })
    
    const fetchSprints = async () => {
        try {
            const response = await axios.get("http://localhost:5000/sprints/fetch")
            setSprints(response.data)
        } catch (error) {
            console.error('Failed to fetch sprints', error);
        }
    }

    const fetchUsersNotInTask = async (taskPersons) => {
        try {
            const response = await axios.post("http://localhost:5000/users/users-not-in-task", { taskPersons })
            // console.log(response.data);
            setUsersNot(response.data)
        } catch (error) {
            console.error('Failed to fetch users not in task', error);
        }
    }

    const handleUpdateSprint = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.put(`http://localhost:5000/tasks/update-sprint/${taskID}`, formDataSprint)
            if (response.status === 200) {
                toast('Task sprint updated successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })

                fetchTaskData(taskID)
                fetchTasks()
            }
        } catch (error) {
            console.error('Failed to update task', error)
            toast('There was an error updating task', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: "#fff"
                }
            })
        }
    }

    const handleInputChange = async (e) => {
        setFormDataSprint((formDataSprint) => ({
            ...formDataSprint,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddTaskUser = async (assignedUserId) => {
        if(assignedUserId) {
            try {
                const response = await axios.put(`http://localhost:5000/tasks/assign-user/${taskID}`, { assignedUserId })
                if (response.status === 200) {
                    fetchTaskData(taskID)
                    fetchTasks()
                }
            } catch (error) {
                console.error('Failed to assign user to task:', error);
            }
        }
    }

    const handleRemoveUser = async (e) => {
        e.preventDefault()

        const taskPersonId = e.target.elements.taskPersonId.value
        console.log({taskPersonId});
        if (!taskPersonId) {
            console.log('No taskPersonId')
        }

        try {
            const response = await axios.put(`http://localhost:5000/tasks/remove-user/${taskID}/${taskPersonId}`)
            if (response.status === 200) {
                fetchTaskData(taskID)
                fetchTasks()
            }
        } catch (error) {
            console.error('Failed to remove user from task:', error)
        }
    }

    const handlePercentageUpdate = async (e) => {
        e.preventDefault()

        const totalPercentageCalc = Object.values(percentageValues).reduce(
            (total, value) => total + parseInt(value || 0, 10),
            0
        )
        
        setTotalPercentage(totalPercentageCalc)
        if (totalPercentageCalc != 100) {
            setErrorPercentage(true)
        } else {
            setErrorPercentage(false)

            const updatedPercentageData = {
                taskId: taskID,
                percentageValues: percentageValues
            }

            try {
                const response = await axios.post(`http://localhost:5000/tasks/update-percentage`, updatedPercentageData)

                console.log({response})
                
                if (response.status === 200) {
                    toast('Percentage updated successfully', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: '#22c55e',
                            color: "#fff"
                        }
                    })
                }
            } catch (error) {
                console.error("Error updating task percentage:", error)
            }
        }
    }

    const handlePercentageChange = async (userId, newValue) => {
        setPercentageValues((prevValues) => ({
            ...prevValues,
            [userId]: newValue
        }))

        console.log({percentageValues})
    }

    const handleArchiveTask = async (e) => {
        e.preventDefault()
        const archiveTaskId = e.target.elements.archiveTaskId.value
        
        try {
            const response = await axios.put(`http://localhost:5000/tasks/archive-task/${archiveTaskId}`)
            if (response.status === 200) {
                toast('Task archived successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })

                fetchTasks()
                closeModal()
            }
        } catch (error) {
            console.error('Failed to remove user from task:', error)
        }
    }

    useEffect(() => {
        if (task && task[0] && task[0].taskPersons) {
            const taskPersons = task[0].taskPersons
            setTaskPersons(taskPersons)
            fetchUsersNotInTask(taskPersons)
            fetchSprints()
        }
    }, [task, fetchTaskData, taskID])

    return (
        <div className='mt-5 py-5 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-col w-full outline-none focus:outline-none'>
            <span>
                <h2 className='font-semibold mb-5'>
                    Task Settings
                </h2>

                <span id='sprints'>
                    <form className='flex items-end gap-4 mb-5' onSubmit={handleUpdateSprint}>
                        <span className='w-[50%]'>
                            <label className={labelClasses} htmlFor="taskCustomer">Change Task Sprint</label>
                            <select 
                                name="taskSprintId"
                                placeholder="Select Sprint" 
                                required
                                className={`${inputClasses} min-w-[200px]`}
                                onChange={(e) => handleInputChange(e)}
                                >
                                <option>Select Sprint</option>
                                {sprints
                                    .map((sprint) => (
                                        <option value={sprint._id} key={sprint._id}>{sprint.sprintName}</option>
                                    ))    
                                }
                            </select>
                        </span>

                        <span>
                            <button type="submit" className='mb-4 button text-black mt-1 bg-white border-indigo-500 hover:bg-indigo-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Update Task Sprint</button>
                        </span>
                    </form>
                </span>

                <span id='taskUsers'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <span>
                            <label className={labelClasses} htmlFor="taskCustomer">Task user(s)</label>
                            <span>
                                <select 
                                    name="taskUsersNot"
                                    placeholder="Add User" 
                                    required
                                    className={`${inputClasses} min-w-[200px]`}
                                    onChange={(e) => handleAddTaskUser(e.target.value)}
                                    >
                                    <option>Add User</option>
                                    {usersNot
                                        .map((user) => (
                                            <option value={user._id} key={user._id}>{user.email}</option>
                                        ))
                                    }
                                </select>
                            </span>
                        </span>
                    </form>

                    <span id='assignedUsers' className='flex flex-col gap-1 mb-5'>
                        {taskPersons
                            .map((user) => (
                                <div key={user._id}>
                                    <span className='flex gap-2 items-center mb-1 border border-zinc-100 p-2 rounded-lg justify-between'>
                                        <section className='flex gap-2 items-center'>
                                            <img className='w-[25px] h-[25px] object-cover object-center rounded-full' src={`${imageSrc}${user.profileImage}`} />
                                            <p className='font-bold text-sm'>{user.username}</p>

                                            {taskPersons.length > 1 && (
                                                <form onSubmit={(e) => handleRemoveUser(e)}>
                                                    <input type="hidden" name='taskPersonId' value={user._id}  />
                                                    <button type="submit" className='border-red-500 px-2 py-0 text-sm'>Remove</button>
                                                </form>
                                            )}
                                        </section>

                                        <section className='flex gap-2 items-center'>
                                            {taskPersons.length > 1 && (
                                                <>
                                                    <form
                                                        className='flex items-center gap-2'
                                                        onSubmit={(e) => handlePercentageUpdate(e, user._id)}
                                                    >
                                                        <input type="hidden" name='taskPersonId' value={user._id}  />

                                                        <span className='flex items-center gap-2 mr-2'>
                                                            <input
                                                                className="px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
                                                                type="number"
                                                                max="100"
                                                                min="1"
                                                                value={percentageValues[user._id] || ''}
                                                                onChange={(e) => handlePercentageChange(user._id, e.target.value)}
                                                                name="personPercentage"
                                                            />
                                                            <label className='text-xs font-normal whitespace-nowrap' htmlFor="personPercentage">% alloc</label>
                                                        </span>
                                                        <button type="submit" className='border-indigo-500 px-2 py-0 text-sm'>Update</button>

                                                    </form>
                                                </>
                                            )}
                                        </section>
                                    </span>
                                </div>
                            ))
                        }

                        {errorPercentage && (
                            <div className='flex flex-col gap-1 text-right justify-end'>
                                <p className='text-xs text-red-500'>There was an error, total percent allocation is not equal 100%</p>
                                <p className='text-xs underline'>Current total allocation percentage: {totalPercentage}%</p>
                            </div>
                        )}
                        
                    </span>

                    <span id='archiveTask'>
                        <hr className='mb-5' />
                        <form onSubmit={(e) => handleArchiveTask(e)}>
                            <label className={labelClasses} htmlFor="archiveTaskId">Archive Task</label>
                            <input type="hidden" name='archiveTaskId' value={taskID} />
                            <button type="submit" className='bg-red-500 text-white px-5 py-2 text-sm'>Archive Task</button>
                        </form>
                    </span>
                </span>
            </span>

            {/* <Toaster /> */}
        </div>
    )
}

export default TaskModalSettings
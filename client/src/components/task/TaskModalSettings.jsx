import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const TaskModalSettings = ({ labelClasses, inputClasses, taskID, fetchTaskData, task }) => {
    const [sprints, setSprints] = useState([])
    const [usersNot, setUsersNot] = useState([])
    const [taskPersons, setTaskPersons] = useState([])
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
            console.log(response.data);
            setUsersNot(response.data)
        } catch (error) {
            console.error('Failed to fetch users not in task', error);
        }
    }

    const handleUpdateSprint = async (event) => {
        console.log({formDataSprint});
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

    const handleAddTaskUser = async (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
    }

    useEffect(() => {
        if (task && task[0] && task[0].taskPersons) {
            const taskPersons = task[0].taskPersons
            setTaskPersons(taskPersons)
            fetchUsersNotInTask(taskPersons)
            fetchSprints()

            console.log(taskPersons);
        }
    }, [task])

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
                                    onChange={(e) => handleAddTaskUser(e)}
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
                </span>
            </span>

            <Toaster />
        </div>
    )
}

export default TaskModalSettings
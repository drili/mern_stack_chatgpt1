import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from "axios"
import Select from "react-select"
import toast, { Toaster } from 'react-hot-toast'

const CreateTask = () => {
    const [taskData, setTaskData] = useState({
        taskName: '',
        taskTimeLow: '',
        taskTimeHigh: '',
        taskDescription: '',
        taskCustomer: '',
        taskLabel: '',
        taskVertical: '',
        taskPersons: [],
        taskSprints: [],
    });
    const [customers, setCustomers] = useState([])
    const [sprints, setSprints] = useState([])
    const [activeUsers, setActiveUsers] = useState([])

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
            setActiveUsers(response.data)
        } catch (error) {
            console.error('Failed to fetch active users', error);
        }
    }

    const fetchSprints = async () => {
        try {
            const response = await axios.get("http://localhost:5000/sprints/fetch")
            setSprints(response.data)
        } catch (error) {
            console.error('Failed to fetch sprints', error);
        }
    }

    useEffect(() => {
        fetchCustomers()
        fetchSprints()
        fetchUsers()
    }, [])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormChangeSprints = (selectedOptions) => {
        setTaskData((prevData) => ({
            ...prevData,
            taskSprints: selectedOptions.map((option) => option.value)
        }))
    }

    const handleFormChangeUsers = (selectedOptions) => {
        setTaskData((prevData) => ({
            ...prevData,
            taskPersons: selectedOptions.map((option) => option.value)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:5000/tasks/create", taskData)

            if (response.status === 200) {
                toast('Task created successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })
            }
        } catch (error) {
            console.error('Failed to create task', error)
            toast('There was an error creating customer', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: "#fff"
                }
            })
        }
    }

    return (
        <div id='createTaskPage'>
            <PageHeading 
                heading="Create Task"
                subHeading={`Create a new task.`}
                suffix="Complete the form and submit the data"
            />

            <section className='grid grid-cols-2 gap-10 mb-10'>
                <span>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="taskName">Task Name</label>
                            <input type="text" name="taskName" value={taskData.taskName} onChange={handleFormChange} placeholder="Task Name" required />
                        </div>
                        <div>
                            <label htmlFor="taskTimeLow">Task Time Low</label>
                            <input type="number" name="taskTimeLow" value={taskData.taskTimeLow} onChange={handleFormChange} placeholder="Task Time Low" required />
                        </div>
                        <div>
                            <label htmlFor="taskTimeHigh">Task Time High</label>
                            <input type="number" name="taskTimeHigh" value={taskData.taskTimeHigh} onChange={handleFormChange} placeholder="Task Time High" required />
                        </div>
                        <div>
                            <label htmlFor="taskDescription">Task Description</label>
                            <textarea name="taskDescription" value={taskData.taskDescription} onChange={handleFormChange} placeholder="Task Description" required />
                        </div>
                        <div>
                            <label htmlFor="taskCustomer">Task Customer</label>
                            <select 
                                name="taskCustomer"
                                onChange={handleFormChange}
                                placeholder="Task Customer" 
                                required
                                >
                                <option>Select Customer</option>
                                {customers
                                    .filter((customer) => !customer.archived)
                                    .map((customer) => (
                                        <option value={customer._id} key={customer._id}>{customer.customerName}</option>
                                    ))    
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="taskLabel">Task Label</label>
                            <input type="text" name="taskLabel" value={taskData.taskLabel} onChange={handleFormChange} placeholder="Task Label" required />
                        </div>
                        <div>
                            <label htmlFor="taskVertical">Task Vertical</label>
                            <input type="text" name="taskVertical" value={taskData.taskVertical} onChange={handleFormChange} placeholder="Task Vertical" required />
                        </div>
                        <div>
                            handleFormChangeUsers
                            <label htmlFor="taskPersons">Task Persons</label>
                            <Select
                                name="taskPersons"
                                onChange={handleFormChangeUsers}
                                options={activeUsers.map((user) => ({
                                    value: user._id,
                                    label: user.username
                                }))}
                                isMulti
                                required
                            ></Select>
                        </div>
                        <div>
                            <label htmlFor="taskSprints">Task Sprints</label>
                            <Select
                                name="taskSprints"
                                onChange={handleFormChangeSprints}
                                options={sprints.map((sprint) => ({
                                    value: sprint._id,
                                    label: sprint.sprintName
                                }))}
                                isMulti
                                required
                            ></Select>
                        </div>

                        <button type="submit">Create Task</button>
                    </form>
                </span>
            </section>

            <Toaster />
        </div>
    )
}

export default CreateTask
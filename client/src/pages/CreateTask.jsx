import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from "axios"
import Select from "react-select"
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from '../context/UserContext'
import { BiSolidTimeFive } from "react-icons/bi"
import TaskModal from '../components/task/TaskModal'
import TaskCard from '../components/task/TaskCard'

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
        createdBy: ''
    });
    const [customers, setCustomers] = useState([])
    const [sprints, setSprints] = useState([])
    const [labels, setLabels] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const { user } = useContext(UserContext)
    const [tasks, setTasks] = useState([])

    const inputClasses = "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    const imageSrc = "http://localhost:5000/uploads/"

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user/${user.id}`)
            setTasks(response.data)
        } catch (error) {
            console.error('Failed to fetch tasks', error);
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

    const fetchLabels = async () => {
        try {
            const response = await axios.get("http://localhost:5000/labels/fetch-labels")
            setLabels(response.data)
        } catch (error) {
            console.error('Failed to fetch labels', error);
        }
    }

    useEffect(() => {
        setTaskData((taskData) => ({
            ...taskData,
            createdBy: user.id
        }))
        fetchSprints()
        fetchUsers()
        fetchTasks()
        fetchCustomers()
        fetchLabels()
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

                fetchTasks()
            }
        } catch (error) {
            console.error('Failed to create task', error)
            toast('There was an error creating task', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: "#fff"
                }
            })
        }
    }

    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleTaskModal = (taskId) => {
        setShowModal(true)
        setSelectedTaskId(taskId)
    }

    const onCloseModal = () => {
        setShowModal(false)
        toast.dismiss()
    }
    
    return (
        <div id='createTaskPage'>
            <PageHeading 
                heading="Create Task"
                subHeading={`Create a new task.`}
                suffix="Complete the form and submit the data"
            />

            <section className='grid grid-cols-5 gap-10 mb-10'>
                <span className='shadow-md p-10 rounded-lg mb-10 col-span-3'>
                    <form onSubmit={handleSubmit}>
                        <span>
                            <h2 className='font-bold mb-5'>Create new task</h2>
                            <hr className='mb-5'/>
                        </span>

                        <div>
                            <label htmlFor="taskName" className={labelClasses}>Task Name</label>
                            <input type="text" name="taskName" value={taskData.taskName} onChange={handleFormChange} placeholder="Task Name" required 
                            className={inputClasses} />
                        </div>
                        <span className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className={labelClasses} htmlFor="taskTimeLow">Task Time Low</label>
                                <input type="number" name="taskTimeLow" value={taskData.taskTimeLow} onChange={handleFormChange} placeholder="Task Time Low" required 
                                className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses} htmlFor="taskTimeHigh">Task Time High</label>
                                <input type="number" name="taskTimeHigh" value={taskData.taskTimeHigh} onChange={handleFormChange} placeholder="Task Time High" required 
                                className={inputClasses} />
                            </div>
                        </span>
                        <div>
                            <label className={labelClasses} htmlFor="taskDescription">Task Description</label>
                            <textarea name="taskDescription" value={taskData.taskDescription} onChange={handleFormChange} placeholder="Task Description" required 
                            className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses} htmlFor="taskCustomer">Task Customer</label>
                            <select 
                                name="taskCustomer"
                                onChange={handleFormChange}
                                placeholder="Task Customer" 
                                required
                                className={inputClasses} 
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
                        <span className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className={labelClasses} htmlFor="taskLabel">Task Label</label>
                                <select
                                    onChange={handleFormChange}
                                    name="taskLabel"
                                    placeholder='Task Label'
                                    required
                                    className={inputClasses}>
                                        <option>Select Label</option>
                                        {labels
                                            .map((label) => (
                                                <option value={label._id} key={label._id}>{label.labelName}</option>
                                            ))
                                        }
                                </select>

                                {/* <label className={labelClasses} htmlFor="taskLabel">Task Label</label>
                                <input type="text" name="taskLabel" value={taskData.taskLabel} onChange={handleFormChange} placeholder="Task Label" required 
                                className={inputClasses} /> */}
                            </div>
                            <div>
                                <label className={labelClasses} htmlFor="taskVertical">Task Vertical</label>
                                <input type="text" name="taskVertical" value={taskData.taskVertical} onChange={handleFormChange} placeholder="Task Vertical" required 
                                className={inputClasses} />
                            </div>
                        </span>
                        
                        <div>
                            <label className={labelClasses} htmlFor="taskPersons">Task Persons</label>
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
                            <label className={labelClasses} htmlFor="taskSprints">Task Sprints</label>
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

                        <button type="submit" className='button text-white mt-10 bg-indigo-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Create Task</button>
                    </form>
                </span>

                <span className='col-span-2'>
                    <div className='shadow-md p-10 rounded-lg mb-10 bg-slate-50'>
                        <span>
                            <h2 className='font-bold mb-5'>Your Recent Created Tasks</h2>
                            <hr className='mb-5'/>
                        </span>
                        
                        <span id='tasksList'>
                            {tasks.map((task) => (
                                <span
                                    key={task._id}
                                    onClick={() => handleTaskModal(task._id)}
                                >
                                    <TaskCard
                                        key={task._id}
                                        taskId={task._id}
                                        taskName={task.taskName}
                                        taskDescription={task.taskDescription}
                                        taskPersons={task.taskPersons}
                                        customerName={task.taskCustomer.customerName}
                                        customerColor={task.taskCustomer.customerColor}
                                        taskLow={task.taskTimeLow}
                                        taskHigh={task.taskTimeHigh}
                                        taskSprintName={task.taskSprints[0].sprintName}
                                    ></TaskCard>
                                </span>

                                // <div 
                                //     key={task._id}
                                //     onClick={() => handleTaskModal(task._id)}
                                //     className='block p-6 mb-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer'>
                                //     <h2 className='mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{task.taskName}</h2>
                                //     <hr className='mb-2' />
                                //     <p className='font-normal text-gray-700 dark:text-gray-400 leading-5'>{task.taskDescription}</p>
                                //     <p className='flex align-center items-center gap-2 mt-4 font-bold text-sm'><BiSolidTimeFive></BiSolidTimeFive>{task.taskTimeLow} - {task.taskTimeHigh}</p>
                                //     <div className='flex align-center items-center text-sm'>
                                //         {task.taskPersons && task.taskPersons.map((person) => (
                                //             <span key={person._id}>
                                //                 {person.profileImage ? (
                                //                     <img className='w-[30px] h-[30px] object-cover object-center rounded-full mr-2 mt-5' src={`${imageSrc}${person.profileImage}`} />
                                //                     ) : (
                                //                     <div className='w-[30px] h-[30px] rounded-full bg-gray-300 mr-2 mt-5'></div>
                                //                 )}                                                
                                //             </span>
                                //         ))}
                                //     </div>
                                // </div>
                            ))}
                        </span>
                    </div>
                </span>
            </section>

            <Toaster />

            {selectedTaskId && (
                <TaskModal
                    taskID={selectedTaskId}
                    showModalState={showModal}
                    // onCloseModal={() => setShowModal(false)}
                    onCloseModal={onCloseModal}
                    fetchTasks={fetchTasks}
                />
            )}
            
        </div>
    )
}

export default CreateTask
import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import axios from "axios"
import Select from "react-select"
import toast, { Toaster } from 'react-hot-toast'

import { BiSolidTimeFive } from "react-icons/bi"
import { AiOutlineClockCircle } from "react-icons/ai"
import { BsFillLightningChargeFill } from "react-icons/bs";

import { UserContext } from '../context/UserContext'
import TaskModal from '../components/task/TaskModal'
import TaskCard from '../components/task/TaskCard'
import getCurrentSprint from '../functions/getCurrentSprint'

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
        createdBy: '',
        taskDeadline: '',
        estimatedTime: 0,
        taskType: "timedTask",
    });
    const [customers, setCustomers] = useState([])
    const [sprints, setSprints] = useState([])
    const [labels, setLabels] = useState([])
    const [verticals, setVerticals] = useState([])
    const [activeUsers, setActiveUsers] = useState([])
    const { user } = useContext(UserContext)
    const [tasks, setTasks] = useState([])
    const [selectedSprints, setSelectedSprints] = useState([]);
    const [displayCount, setDisplayCount] = useState(5)
    const [toggleViewState, setToggleViewState] = useState("timedTask")

    const activeSprint = getCurrentSprint()

    const inputClasses = "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    const imageSrc = "http://localhost:5000/uploads/"

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setTaskData({
            ...taskData,
            [name]: value
        })
    }

    const handleViewState = (value) => {
        setTaskData((taskData) => ({
            ...taskData,
            taskDeadline: "",
            estimatedTime: 0,
            taskTimeLow: '',
            taskTimeHigh: '',
            taskType: value,
        }))

        if (value === "quickTask") {
            setTaskData((taskData) => ({
                ...taskData,
                taskTimeLow: 0,
                taskTimeHigh: 0,
            }))
        }

        setToggleViewState(value)
    }

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + 5)
    }

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

    const fetchVerticals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/verticals/fetch-verticals")
            setVerticals(response.data)
        } catch (error) {
            console.error('Failed to fetch verticals', error);
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
        fetchVerticals()
    }, [])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormChangeSprints = (selectedOptions) => {
        setSelectedSprints(selectedOptions);
        setTaskData((prevData) => ({
            ...prevData,
            taskSprints: selectedOptions.map((option) => option.value)
        }));
    }

    const handleFormChangeUsers = (selectedOptions) => {
        const numberOfUsers = selectedOptions.length

        const personsWithPercentage = selectedOptions.map((option) => ({
            user: option.value,
            percentage:  100 / numberOfUsers,
        }))

        setTaskData((prevData) => ({
            ...prevData,
            taskPersons: personsWithPercentage
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log({taskData});

        try {
            const response = await axios.post("http://localhost:5000/tasks/create", taskData)
            setTasks([])

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

            console.log(response.data);
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

    useEffect(() => {
        if (activeSprint.sprintId) {
            const activeSprintOption = sprints.find(sprint => sprint._id === activeSprint.sprintId);
            if (activeSprintOption) {
                setSelectedSprints([{ value: activeSprintOption._id, label: activeSprintOption.sprintName }]);
            }

            setTaskData((prevData) => ({
                ...prevData,
                taskSprints: [activeSprintOption?._id]
            }));
        }
    }, [activeSprint, sprints]);
    
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
                            <section className='flex w-full justify-between'>
                                <div>
                                    <h2 className='font-bold mb-0'>Create new <span className={`${toggleViewState === "timedTask" ? "text-slate-500" : "text-amber-500"}`}>
                                        {toggleViewState === "timedTask" ? "timed" : "quick"}</span> task
                                        </h2>
                                </div>

                                <div className='flex items-start pb-0 rounded-t'>
                                    <button 
                                        className={`${toggleViewState === "timedTask" ? "bg-slate-500 text-white font-bold border-slate-200" : "" } rounded-none border-slate-100 focus:outline-none hover:outline-none hover:border-slate-100 flex gap-2 items-center`} 
                                        onClick={() => handleViewState("timedTask")}
                                        type='button'
                                        >
                                        Timed Task <AiOutlineClockCircle />
                                    </button>
                                    <button 
                                        className={`${toggleViewState === "quickTask" ? "bg-amber-500 text-white font-bold border-amber-200" : "" } rounded-none border-amber-100 focus:outline-none hover:border-amber-100 flex gap-2 items-center`} 
                                        onClick={() => handleViewState("quickTask")}
                                        type='button'
                                        >
                                        Quick Task <BsFillLightningChargeFill />
                                    </button>
                                </div>
                            </section>

                            <hr className='mb-5'/>
                        </span>

                        <div>
                            <label htmlFor="taskName" className={labelClasses}>Task Name</label>
                            <input type="text" name="taskName" value={taskData.taskName} onChange={handleFormChange} placeholder="Task Name" required 
                            className={inputClasses} />
                        </div>

                        {toggleViewState === "timedTask" ? (
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

                                <span className='hidden'>
                                    <input type='hidden' value={taskData.taskType} name='taskType' />
                                </span>
                            </span>
                        ) : (
                            <span className='grid grid-cols-2 gap-4'>
                                <span>
                                    <label className={labelClasses} htmlFor="taskDeadline">Deadline</label>
                                    <input
                                        className={inputClasses}
                                        type="date"
                                        name='taskDeadline'
                                        required
                                        onChange={handleInputChange}
                                    />
                                </span>
                                <div>
                                    <label className={labelClasses} htmlFor="estimatedTime">Estimated Time <span className='text-slate-300'>optional</span></label>
                                    <input type="number" name="estimatedTime" value={taskData.estimatedTime} onChange={handleFormChange} placeholder="Estimated Task Time" 
                                    className={inputClasses} />
                                </div>

                                <span className='hidden'>
                                    <input type='hidden' value={taskData.taskType} name='taskType' />
                                </span>
                            </span>
                        )}

                        <div>
                            <label className={labelClasses} htmlFor="taskDescription">Task Description</label>
                            <textarea required={false} name="taskDescription" value={taskData.taskDescription} onChange={handleFormChange} placeholder="Task Description" 
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
                            </div>
                            <div>
                                <label className={labelClasses} htmlFor="taskVertical">Task Vertical</label>
                                <select
                                    onChange={handleFormChange}
                                    name="taskVertical"
                                    placeholder='Task Vertical'
                                    required
                                    className={inputClasses}>
                                        <option>Select Vertical</option>
                                        {verticals
                                            .map((vertical) => (
                                                <option value={vertical._id} key={vertical._id}>{vertical.verticalName}</option>
                                            ))
                                        }
                                </select>
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
                            {activeSprint && selectedSprints && sprints && (
                                <Select
                                    name="taskSprints"
                                    onChange={handleFormChangeSprints}
                                    options={sprints.map((sprint) => ({
                                        value: sprint._id,
                                        label: sprint.sprintName
                                    }))}
                                    isMulti
                                    required
                                    value={selectedSprints}
                                ></Select>
                            )}
                        </div>

                        {/* <p>Current sprint: {activeSprint.sprintId}</p> */}

                        <button type="submit" className='button text-white mt-10 bg-rose-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Create Task</button>
                    </form>
                </span>

                <span className='col-span-2'>
                    <div className='shadow-md p-10 rounded-lg mb-10 bg-slate-50'>
                        <span>
                            <h2 className='font-bold mb-5'>Your Recent Created Tasks</h2>
                            <hr className='mb-5'/>
                        </span>
                        
                        <span id='tasksList'>
                            {tasks.slice(0, displayCount).map((task) => (
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
                                        taskType={task.taskType}
                                        estimatedTime={task?.estimatedTime}
                                        taskDeadline={task?.taskDeadline}
                                    ></TaskCard>
                                </span>
                            ))}
                        </span>

                        <span>
                            {displayCount < tasks.length && (
                                <button onClick={handleLoadMore}
                                className='bg-white text-slate-900 mt-5 h-fit whitespace-nowrap button border-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>
                                    Load More Tasks
                                </button>
                            )}
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
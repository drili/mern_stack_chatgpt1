import React, { useEffect, useState } from 'react'
import { FaWindowClose } from "react-icons/fa"
import { BsFillLightningChargeFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import TaskModalSettings from './TaskModalSettings'
import TaskTimeRegistration from './TaskTimeRegistration'
import TaskChat from './TaskChat'

const TaskModal = ({ taskID, showModalState, onCloseModal, fetchTasks, updateFunc, sprintOverviewFetch, fetchWorkflow }) => {
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState([])
    const [taskSprint, setTaskSprint] = useState([])
    const [formData, setFormData] = useState({
        taskName: "",
        taskTimeLow: "",
        taskTimeHigh: "",
        taskDescription: "",
        taskDeadline: "",
        estimatedTime: 0,
    })
    const [toggleViewState, setToggleViewState] = useState("task")

    const inputClasses = "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const handleViewState = (value) => {
        setToggleViewState(value)
    }

    const handleInputChange = (event) => {
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
    }

    const fetchTaskData = async (taskID) => {
        if (taskID) {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-id/${taskID}`)

            setTask(response.data)
            setFormData((formData) => ({
                ...formData,
                taskName: response.data[0]["taskName"],
                taskTimeLow: response.data[0]["taskTimeLow"],
                taskTimeHigh: response.data[0]["taskTimeHigh"],
                taskDescription: response.data[0]["taskDescription"],
                taskDeadline: response.data[0]["taskDeadline"],
                estimatedTime: response.data[0]["estimatedTime"],
            }))
        }
    }

    const closeModal = () => {
        setShowModal(false)
        setTask([])
        onCloseModal()
        toast.dismiss()
    }

    useEffect(() => {
        if (showModalState) {
            setTimeout(() => {
                const taskElement = document.querySelector(`.taskModalComponent`)
                if (taskElement) {
                    const offset = -0
                    window.scroll({
                        top: taskElement.getBoundingClientRect().top + window.scrollY + offset,
                        behavior: 'smooth',
                    })
                }
            }, 250)
        }

        setShowModal(showModalState)
        fetchTaskData(taskID)
    }, [showModalState])

    const handleUpdateTask = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.put(`http://localhost:5000/tasks/update/${taskID}`, formData)

            if (response.status === 200) {
                toast('Task updated successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })
            }
            fetchTasks()
            updateFunc()
            // sprintOverviewFetch()
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

    return (
        <div id={`taskID_${taskID}`} className=''>
            <>
                {showModal ? (
                    <>
                        <div
                            // className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            className='absolute z-50 top-0 w-full translate-x-[-50%] left-[50%]'
                        >
                            <div className="relative my-6 mx-auto max-w-screen-xl w-full taskModalComponent">

                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    <div className='flex items-center gap-2 px-4 pt-5 pb-0 rounded-t md:px-10'>
                                        <span className="taskLabel bg-rose-100 text-sm px-2 py-1 rounded text-rose-800 font-bold">
                                            {task[0]?.taskSprints[0]?.sprintName}
                                        </span>

                                        {task[0]?.taskType === "quickTask" && (
                                            <>
                                                <span className="flex items-center gap-2 taskLabel bg-amber-500 text-sm px-2 py-1 rounded text-white font-bold">
                                                    Quick Task <BsFillLightningChargeFill className='text-white' />
                                                </span>

                                                <span className="flex items-center gap-2 taskLabel bg-amber-500 text-sm px-2 py-1 rounded text-white font-bold">
                                                    <p className='font-bold text-sm'>{task[0]?.taskDeadline}</p><AiOutlineClockCircle />
                                                </span>
                                            </>
                                        )}

                                    </div>
                                    <div className="flex items-start justify-between p-4 pb-5 rounded-t md:px-10">
                                        <span>
                                            <h3 className="text-3xl font-semibold">
                                                {formData["taskName"]}
                                            </h3>
                                            <p className='text-slate-500 text-sm mt-2'>ID: {taskID}</p>
                                        </span>
                                        <button
                                            className="text-white bg-black font-bold uppercase text-sm focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            <h4><FaWindowClose></FaWindowClose></h4>
                                        </button>
                                    </div>

                                    <div className='flex items-start px-4 pt-5 pb-0 rounded-t md:px-10'>
                                        <button className={`${toggleViewState === "task" ? "bg-slate-950 text-white font-bold underline border-slate-200" : ""} rounded-none border-slate-100 focus:outline-none hover:outline-none hover:border-slate-100`} onClick={() => handleViewState("task")}>Task</button>
                                        <button className={`${toggleViewState === "taskChat" ? "bg-slate-950 text-white font-bold underline border-slate-200" : ""} rounded-none border-slate-100 focus:outline-none hover:border-slate-100`} onClick={() => handleViewState("taskChat")}>Task Chat</button>
                                    </div>

                                    {toggleViewState === "task" ? (
                                        <div className="relative p-4 pt-0 flex-auto md:p-10 md:pt-0">
                                            <hr />

                                            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10'>
                                                <section className='mt-5'>
                                                    {task[0]?.taskType !== "quickTask" && (
                                                        <section>
                                                            {task && (
                                                                <TaskTimeRegistration
                                                                    labelClasses={labelClasses}
                                                                    inputClasses={inputClasses}
                                                                    taskId={taskID}
                                                                    sprintId={task[0]?.taskSprints[0]?._id}
                                                                    customerId={task[0]?.taskCustomer?._id}
                                                                    verticalId={task[0]?.taskVertical}
                                                                ></TaskTimeRegistration>
                                                            )}
                                                        </section>
                                                    )}

                                                    <form className='mt-5 py-5 px-5 border-0 rounded-lg bg-slate-50 relative flex flex-col w-full outline-none focus:outline-none' onSubmit={handleUpdateTask}>
                                                        <div>
                                                            <h2 className='font-semibold mb-5'>Update Task</h2>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="taskName" className={labelClasses}>Task Name</label>
                                                            <input type="text" name="taskName" placeholder="Task Name" required value={formData["taskName"]}
                                                                className={inputClasses}
                                                                onChange={(e) => handleInputChange(e)} />
                                                        </div>
                                                        <span className='grid grid-cols-2 gap-4'>
                                                            {task[0]?.taskType !== "quickTask" && (
                                                                <>
                                                                    <div>
                                                                        <label className={labelClasses} htmlFor="taskTimeLow">Task Time Low</label>
                                                                        <input type="number" name="taskTimeLow" placeholder="Task Time Low" required value={formData["taskTimeLow"]}
                                                                            className={inputClasses}
                                                                            onChange={(e) => handleInputChange(e)} />
                                                                    </div>
                                                                    <div>
                                                                        <label className={labelClasses} htmlFor="taskTimeHigh">Task Time High</label>
                                                                        <input type="number" name="taskTimeHigh" placeholder="Task Time High" required value={formData["taskTimeHigh"]}
                                                                            className={inputClasses}
                                                                            onChange={(e) => handleInputChange(e)} />
                                                                    </div>
                                                                </>
                                                            )}

                                                            {task[0]?.taskType === "quickTask" && (
                                                                <>
                                                                    <span>
                                                                        <label className={labelClasses} htmlFor="taskDeadline">Deadline</label>
                                                                        <input
                                                                            className={inputClasses}
                                                                            type="date"
                                                                            name='taskDeadline'
                                                                            required
                                                                            onChange={(e) => handleInputChange(e)}
                                                                            value={formData["taskDeadline"]}
                                                                        />
                                                                    </span>
                                                                    <div>
                                                                        <label className={labelClasses} htmlFor="estimatedTime">Estimated Time <span className='text-slate-300'>optional</span></label>
                                                                        <input 
                                                                            type="number" name="estimatedTime" value={formData["estimatedTime"]} placeholder="Estimated Task Time"
                                                                            onChange={(e) => handleInputChange(e)}
                                                                            className={inputClasses} 
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </span>
                                                        <div>
                                                            <label className={labelClasses} htmlFor="taskDescription">Task Description</label>

                                                            <textarea name="taskDescription" placeholder="Task Description" value={formData["taskDescription"]}
                                                                className={inputClasses}
                                                                onChange={(e) => handleInputChange(e)} />
                                                        </div>

                                                        <button type="submit" className='mb-4 button text-black mt-1 bg-white border-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Update Task</button>
                                                    </form>
                                                </section>

                                                <section id='taskModalSettings' className='mt-5'>
                                                    <TaskModalSettings
                                                        inputClasses={inputClasses}
                                                        labelClasses={labelClasses}
                                                        taskID={taskID}
                                                        fetchTaskData={fetchTaskData}
                                                        fetchTasks={fetchTasks}
                                                        task={task}
                                                        closeModal={closeModal}
                                                        sprintOverviewFetch={sprintOverviewFetch}
                                                        updateFunc={updateFunc}
                                                        taskType={task[0].taskType}
                                                    />
                                                </section>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative p-4 pt-0 flex-auto md:p-10 md:pt-0">
                                            <hr />

                                            <div className='grid grid-cols-1 gap-5 md:gap-10'>
                                                <section className='mt-5'>
                                                    {taskID && (
                                                        <TaskChat taskID={taskID} />
                                                    )}
                                                </section>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>

            <Toaster />
        </div>
    )
}

export default TaskModal
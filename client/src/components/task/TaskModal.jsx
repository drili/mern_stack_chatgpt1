import React, { useEffect, useState } from 'react'
import { FaWindowClose } from "react-icons/fa"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import TaskModalSettings from './TaskModalSettings'

const TaskModal = ({ taskID, showModalState, onCloseModal, fetchTasks }) => {
    const [showModal, setShowModal] = useState(false)
    const [task, setTask] = useState([])
    const [taskSprint, setTaskSprint] = useState([])
    const [formData, setFormData] = useState({
        taskName: "",
        taskTimeLow: "",
        taskTimeHigh: "",
        taskDescription: ""
    })

    const inputClasses = "mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const handleInputChange = (event) => {
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
    }

    const fetchTaskData = async (taskID) => {
        const response = await axios.get(`http://localhost:5000/tasks/fetch-by-id/${taskID}`)
        setTask(response.data)
        setFormData((formData) => ({
            ...formData,
            taskName: response.data[0]["taskName"],
            taskTimeLow: response.data[0]["taskTimeLow"],
            taskTimeHigh: response.data[0]["taskTimeHigh"],
            taskDescription: response.data[0]["taskDescription"],
        }))
    }

    const closeModal = () => {
        setShowModal(false)
        setTask([])
        onCloseModal()
    }
    
    useEffect(() => {
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
        <div id={taskID}>
            <>
                {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative my-6 mx-auto max-w-screen-xl w-full">
                                
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    
                                    <div className='flex items-start justify-between px-10 pt-5 pb-0 rounded-t'>
                                        <span className="taskLabel bg-indigo-100 text-sm px-2 py-1 rounded text-indigo-800 font-bold">
                                            {task[0]?.taskSprints?.sprintName}
                                        </span>
                                    </div>
                                    <div className="flex items-start justify-between p-10 pb-5 rounded-t">
                                        <span>
                                            <h3 className="text-3xl font-semibold">
                                                {formData["taskName"]}
                                            </h3>
                                            <p className='text-slate-500 text-sm mt-2'>#{taskID}</p>
                                        </span>
                                        <button
                                            className="text-white bg-red-500 font-bold uppercase text-sm focus:outline-none ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            <h4><FaWindowClose></FaWindowClose></h4>
                                        </button>
                                    </div>
                                    
                                    <div className="relative p-10 pt-0 flex-auto">
                                        <hr />
                                        
                                        <div className='grid grid-cols-2 gap-10'>
                                            <section className='mt-5'>
                                                <form className='mt-5' onSubmit={handleUpdateTask}>
                                                    <div>
                                                        <label htmlFor="taskName" className={labelClasses}>Task Name</label>
                                                        <input type="text" name="taskName" placeholder="Task Name" required value={formData["taskName"]} 
                                                        className={inputClasses} 
                                                        onChange={(e) => handleInputChange(e)}/>
                                                    </div>
                                                    <span className='grid grid-cols-2 gap-4'>
                                                        <div>
                                                            <label className={labelClasses} htmlFor="taskTimeLow">Task Time Low</label>
                                                            <input type="number" name="taskTimeLow" placeholder="Task Time Low" required value={formData["taskTimeLow"]}   
                                                            className={inputClasses} 
                                                            onChange={(e) => handleInputChange(e)}/>
                                                        </div>
                                                        <div>
                                                            <label className={labelClasses} htmlFor="taskTimeHigh">Task Time High</label>
                                                            <input type="number" name="taskTimeHigh" placeholder="Task Time High" required value={formData["taskTimeHigh"]}  
                                                            className={inputClasses} 
                                                            onChange={(e) => handleInputChange(e)}/>
                                                        </div>
                                                    </span>
                                                    <div>
                                                        <label className={labelClasses} htmlFor="taskDescription">Task Description</label>

                                                        <textarea name="taskDescription" placeholder="Task Description" required value={formData["taskDescription"]} 
                                                        className={inputClasses} 
                                                        onChange={(e) => handleInputChange(e)}/>
                                                    </div>

                                                    <button type="submit" className='button text-white mt-5 bg-indigo-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Update Task</button>
                                                </form>
                                            </section>

                                            <section id='taskModalSettings' className='mt-5'>
                                                <TaskModalSettings
                                                    inputClasses={inputClasses}
                                                    labelClasses={labelClasses}
                                                    taskID={taskID}
                                                    fetchTaskData={fetchTaskData}
                                                    task={task}
                                                />
                                            </section>
                                        </div>
                                    </div>
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
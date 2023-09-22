import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'

const TaskTimeRegistration = ({ labelClasses, inputClasses, taskId, sprintId }) => {
    const { user } = useContext(UserContext)
    const [timeRegistrations, setTimeRegistrations] = useState([])
    const [formRegisterTime, setFormRegisterTime] = useState({
        userId: user.id,
        taskId: taskId,
        timeRegistered: "",
        description: "",
        sprintId: sprintId
    })

    const fetchTimeRegistrations = async (taskId) => {
        try {
            const response = await axios.get(`http://localhost:5000/time-registrations/time-registered/${taskId}`)
            setTimeRegistrations(response.data)
        } catch (error) {
            console.error('Failed to fetch registered time(s)', error)
        }
    }

    const handleInputChange = async (e) => {
        setFormRegisterTime((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    const handleRegisterTime = async (e) => {
        e.preventDefault()
        
        // TODO: Add data to timeRegistrationType:
        // Types: Intern time, Client time, Off Time, Sick Time
        if (formRegisterTime.timeRegistered > 0) {
            try {
                const response = await axios.post(`http://localhost:5000/time-registrations/register-time`, formRegisterTime)
                if (response.status === 201) {
                    toast('Time registered successfully', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: '#22c55e',
                            color: "#fff"
                        }
                    })

                    fetchTimeRegistrations(taskId)
                }
            } catch (error) {
                console.error('Failed to register time', error)
                toast('There was an error registering time', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#ef4444',
                        color: "#fff"
                    }
                })
            }
        }
    }

    useEffect(() => {
        fetchTimeRegistrations(taskId)
        setFormRegisterTime((formData) => ({
            ...formData,
            sprintId: sprintId
        }))
    }, [taskId, sprintId])

    return (
        <div id='TaskTimeRegistration' className='mt-5 py-5 px-5 border-0 rounded-lg bg-indigo-50 relative flex flex-col w-full outline-none focus:outline-none'>
            <h2 className='font-semibold mb-5'>Register Time</h2>

            <span className='timeRegistrationField flex flex-col gap-4'>
                <div className='flex-1'>
                    <form onSubmit={handleRegisterTime}>
                        <label className={labelClasses} htmlFor="timeRegistered">Time</label>
                        <input 
                            className={inputClasses}
                            placeholder='1.25 Hours'
                            type='number'
                            step="0.25"
                            name="timeRegistered"
                            onChange={(e) => handleInputChange(e)}
                            required
                            >
                        </input>
                        <button type="submit" className='mb-4 button text-black mt-1 bg-white border-indigo-500 hover:bg-indigo-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Register Time</button>
                    </form>
                </div>

                <div className='flex-1'>
                    <label className={labelClasses}>Total Time Registered</label>

                    
                    {timeRegistrations && timeRegistrations.length > 0 ? (
                        <p className='font-bold underline'>
                            {timeRegistrations.reduce((totalTime, registration) => totalTime + registration.timeRegistered, 0)}
                        </p>
                    ) : (
                        <p className='font-bold underline'>
                            0
                        </p>
                    )}
                </div>
            </span>

            {/* <Toaster /> */}
        </div>
    )
}

export default TaskTimeRegistration
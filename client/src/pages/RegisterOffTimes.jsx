import React, { useContext, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { Card } from "flowbite-react"
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import toast, { Toaster } from 'react-hot-toast'
import { ConfigContext } from '../context/ConfigContext'

const RegisterOffTimes = () => {
    const { user } = useContext(UserContext)
    const [formValues, setFormValues] = useState({
        userId: user.id,
        currentTime: "",
        registrationType: "",
        timeRegistered: "",
        taskId: null,
        sprintId: ""

    })
    const [sprintId, setSprintId] = useState("")
    const { baseURL } = useContext(ConfigContext);

    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newDate = new Date(formValues.currentTime)
        const optionsYear = { year: "numeric"}
        const optionsMonth = { month: "long" }

        const formattedTimeYear = newDate.toLocaleDateString('en-US', optionsYear);
        const formattedTimeMonth = newDate.toLocaleDateString('en-US', optionsMonth);

        try {
            const response = await axios.get(`${baseURL}/sprints/fetch-sprint-by-month-year/${formattedTimeMonth}/${formattedTimeYear}`)
            
            const updatedFormValues = {
                ...formValues,
                sprintId: response.data[0]._id
            };

            if(response.data[0]._id) {
                await registerTime(updatedFormValues)
            }
        } catch (error) {
            console.error("Error fetching sprints by month & year", error)
        }
    }

    const registerTime = async (formValues) => {
        if (formValues && formValues.sprintId) {
            try {
                const responseTime = await axios.post(`${baseURL}/time-registrations/register-time`, formValues)
                if (responseTime.status === 201) {
                    toast('Time registration was successful', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: '#22c55e',
                            color: "#fff"
                        }
                    })
                }
            } catch (error) {
                console.error("Error time registration", error)
            }
            
        }
    }

    return (
        <div id='RegisterOffTimes'>
            <PageHeading 
                heading="Off- & Sicktime Time Registrations"
                subHeading={`Register your off- & sicktime registrations here`}
                suffix="Use date picker to select specific date(s)."
            />

            <section className='grid grid-cols-12'>
                <Card className='col-span-6'>
                    <h3 className="font-bold">Fill out the form to register your time.</h3>

                    <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <span>
                            <label className={labelClasses} htmlFor="timeRegistered">Time Amount</label>
                            <input 
                                className={inputClasses} 
                                type="number" 
                                value={formValues.timeRegistered}
                                name='timeRegistered' 
                                required 
                                step=".25"
                                onChange={handleInputChange}
                            />
                        </span>

                        <span>
                            <label className={labelClasses} htmlFor="currentTime">Date</label>
                            <input
                                className={inputClasses}
                                type="date"
                                name='currentTime'
                                value={formValues.currentTime}
                                required
                                onChange={handleInputChange}
                            />
                        </span>

                        <span>
                            <label className={labelClasses} htmlFor="registrationType">Registration Type</label>
                            <select 
                                className={inputClasses} 
                                name="registrationType"
                                value={formValues.registrationType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="" defaultValue>Select type</option>
                                <option value="offtime">Offtime</option>
                                <option value="sicktime">Sicktime</option>
                            </select>
                        </span>

                        <button type="submit" className='mb-4 button text-black mt-1 bg-white border-rose-500 hover:bg-rose-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'>Register Time</button>
                    </form>
                </Card>
            </section>

            <Toaster />
        </div>
    )
}

export default RegisterOffTimes
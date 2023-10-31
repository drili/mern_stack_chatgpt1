import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import axios from 'axios'

const TimeRegistrationTable = ({ eventObj, toast, fetchUserRegistrations, userId }) => {
    const [editedTimes, setEditedTimes] = useState({})
    const [eventObjState, setEventObjState] = useState(eventObj)

    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const handleTimeChange = (eventId, time) => {
        setEditedTimes({
            ...editedTimes,
            [eventId]: time
        })
    }

    const handleSaveTime = async (event) => {
        const eventId = event._id
        const editedTime = editedTimes[eventId] || event.timeRegistered
        
        if (eventId && editedTime && editedTime > 0) {
            console.log({eventId, editedTime});
            try {
                const response = await axios.post(`http://localhost:5000/time-registrations/time-registration-update`, { eventId, editedTime })

                if (response.status === 200) {
                    toast('Time registration updated successfully', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: '#22c55e',
                            color: "#fff"
                        }
                    })

                    fetchUserRegistrations(userId)
                }
            } catch (error) {
                console.error('Failed to update time registration', error)
            }
        } 
    }

    const handleDeleteTime = async (eventId) => {
        if (eventId) {
            try {
                const response = await axios.delete(`http://localhost:5000/time-registrations/time-registration-delete/${eventId}`)

                if (response.status === 200) {
                    toast('Time registration has been deleted', {
                        duration: 4000,
                        position: 'top-center',
                        style: {
                            background: '#ef4444',
                            color: "#fff"
                        }
                    })

                    setEventObjState(eventObjState.filter(event => event._id !== eventId))

                    fetchUserRegistrations(userId)
                }
            } catch (error) {
                console.error('Failed to delete time registration', error)
            }            
        }
    }
    
    useEffect(() => {
        if (eventObj) {
            setEventObjState(eventObj)
        }
    }, [eventObj])

    return (
        <div>
            <Table className='relative'>
                <Table.Head>
                    <Table.HeadCell className='text-left'>
                        Task Name
                    </Table.HeadCell>
                    {/* <Table.HeadCell className='text-left'>
                        Client
                    </Table.HeadCell> */}
                    <Table.HeadCell className='text-left'>
                        Time
                    </Table.HeadCell>
                    <Table.HeadCell className='text-left'>
                        Edit
                    </Table.HeadCell>
                    <Table.HeadCell className='text-left'>
                        Delete
                    </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {eventObjState &&
                        eventObjState.map(event => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={event._id}>
                                <Table.Cell className="whitespace-break-spaces font-medium text-gray-900 dark:text-white text-xs leading-3">
                                    {event.taskId ? event.taskId.taskName : "Off- & Sicktime"}
                                    {/* {event.taskId ? event.taskId.taskName : (event.registrationType === "offtime" ? "offtime" : "sicktime")} */}
                                </Table.Cell>
                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    <input
                                        step="0.25"
                                        className={inputClasses}
                                        type="number"
                                        value={editedTimes[event._id] || event.timeRegistered}
                                        onChange={(e) => handleTimeChange(event._id, e.target.value)}
                                    />
                                </Table.Cell>

                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    <a
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-xs"
                                        onClick={() => handleSaveTime(event)}
                                    >
                                    <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                        Save
                                    </p>
                                    </a>
                                </Table.Cell>
                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    <a
                                        className="font-medium text-red-500 hover:underline dark:text-cyan-500 text-xs"
                                        onClick={() => handleDeleteTime(event._id)}
                                    >
                                    <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                        Delete
                                    </p>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default TimeRegistrationTable
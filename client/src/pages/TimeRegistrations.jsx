import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card } from 'flowbite-react'
import {AiFillInfoCircle} from "react-icons/ai"
import { UserContext } from '../context/UserContext'
import "../assets/css/calendar/calendar.css"
import axios from 'axios'
import TimeRegistrationTable from '../components/time-registrations/TimeRegistrationTable'
import toast, { Toaster } from 'react-hot-toast'

const TimeRegistrations = () => {
    const localizer = momentLocalizer(moment);
    const { user } = useContext(UserContext)
    const [events, setEvents] = useState()
    const [eventsByDate, setEventsByDate] = useState([])

    const CustomEvent = ({ event }) => {
        return (
            <div>
                {event.title}
            </div>
        )
    }

    const fetchUserRegistrations = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:5000/time-registrations/time-registered-by-user`, { userId })
            // console.log(response.data);
            const formattedEvents = response.data.map(item => {
                return {
                    id: `${item.currentTime}`,
                    title: `${item.totalRegisteredTime} hours`,
                    start: item.currentTime,
                    end: item.currentTime
                }
            })

            setEvents(formattedEvents)
        } catch (error) {
            console.error('Failed to fetch time registrations', error)
        }
    }

    const fetchRegistrationsByDate = async (date) => {
        try {
            const response = await axios.get(`http://localhost:5000/time-registrations/time-registrations-by-date/${date}/${user.id}`)
            setEventsByDate(response.data)

            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch time registrations by date', error)
        }
    }

    useEffect(() => {
        fetchUserRegistrations(user.id)
    }, [user])

    const handleSelected = (event) => {
        console.log(event.id);
        fetchRegistrationsByDate(event.id)
    }

    return (
        <div id='TimeRegistrations'>
            <PageHeading
                heading="Time Registrations"
                subHeading={`Your own personal time registrations, mapped over a calendar. Click to edit/remove your time registrations`}
                suffix=""
            />

            {/* // TODO: Finish "Time Registration" page */}
            <section className='grid grid-cols-10 gap-10 mb-10'>
                <div className='col-span-6'>
                    <div style={{ height: 500 }}>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            components={{
                                event: CustomEvent,
                            }}
                            startAccessor="start"
                            endAccessor="end"
                            defaultDate={new Date()}
                            views={{
                                month: true,
                                // FIXME: Fix "day" picker issue/bug
                                day: false,
                                week: false,
                                agenda: true
                            }}
                            dayPropGetter={(date) => {
                                if (date.getDay() === 0 || date.getDay() === 6) {
                                    return {
                                        className: 'weekend-day',
                                    };
                                }
                                return {};
                            }}
                            onSelectEvent={handleSelected}
                        />
                    </div>
                </div>
                
                <div className='col-span-4'>
                    <Card className='h-auto'>
                        <h3 className="font-bold">Your time registrations</h3>
                        <span className='flex gap-1 items-center flex-row'>
                            <AiFillInfoCircle/> 
                            <p className='text-xs font-thin'>Pick date to see your time registrations.</p>
                        </span>

                        <span className='relative'>
                            <TimeRegistrationTable
                                eventObj={eventsByDate}
                                toast={toast}
                                fetchUserRegistrations={fetchUserRegistrations}
                                userId={user.id}
                            />
                        </span>
                    </Card>
                </div>
            </section>

            <Toaster />
        </div>
    )
}

export default TimeRegistrations
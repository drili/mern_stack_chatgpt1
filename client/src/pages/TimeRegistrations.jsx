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

const TimeRegistrations = () => {
    const localizer = momentLocalizer(moment);
    const { user } = useContext(UserContext)
    const [events, setEvents] = useState()

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
            const formattedEvents = response.data.map(item => {
                return {
                    id: `${item.createdAt}`,
                    title: `${item.totalRegisteredTime} hours`,
                    start: item.createdAt,
                    end: item.createdAt
                }
            })
            setEvents(formattedEvents)
        } catch (error) {
            console.error('Failed to fetch time registrations', error)
        }
    }

    useEffect(() => {
        fetchUserRegistrations(user.id)
    }, [user])

    const handleSelected = (event) => {
        console.log(event.id);
    }

    return (
        <div id='TimeRegistrations'>
            <PageHeading
                heading="Time Registrations"
                subHeading={`Your own personal time registrations, mapped over a calendar. Click to edit/remove your time registrations`}
                suffix=""
            />

            {/* // TODO: Finish "Time Registration" page */}
            <section className='grid grid-cols-3 gap-10 mb-10'>
                <div className='col-span-2'>
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

                {/* // TODO: Finish this section. When user clicks on event, it shows log over all time registration by user on that date. */}
                <div className='col-span-1'>
                    <Card className='h-auto'>
                        <h3 className="font-bold">Your time registrations</h3>
                        <span className='flex gap-1 items-center flex-row'>
                            <AiFillInfoCircle/> 
                            <p className='text-xs font-thin'>Pick date to see your time registrations.</p>
                        </span>

                        <span>
                            {events &&
                                events.map(event => (
                                    <p key={event.id}>{event.id}</p>
                                ))
                            }
                        </span>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default TimeRegistrations
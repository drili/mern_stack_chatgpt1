import React, { useContext, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import PageHeading from '../components/PageHeading'
import { Card } from "flowbite-react"
import DashboardFilters from "../components/dashboard/DashboardFilters"
import { UserContext } from '../context/UserContext'
import { useEffect } from "react"
import getCurrentSprint from "../functions/getCurrentSprint"
import monthWorkdays from "../functions/monthWorkdays"

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [selectedSprint, setSelectedSprint] = useState("")
    const activeSprint  = getCurrentSprint()
    const [workDays, setWorkDays] = useState("")
    
    const [timeRegistered, setTimeRegistered] = useState([])
    const [totalAccumulatedTime, setTotalAccumulatedTime] = useState("")

    const fetchTimeRegistrations = async (sprintId) => {
        try {
            if (sprintId) {
                const response = await axios.get(`http://localhost:5000/time-registrations/time-registered-user/${sprintId}/${user.id}`)
                setTimeRegistered(response.data)

                if (response.status == 200) {
                    const totalAccumulatedTime = response.data.reduce((accumulator, time) => {
                        const timeValue = parseFloat(time?.timeRegistered)

                        if (!isNaN(timeValue)) {
                            accumulator += timeValue;
                        }

                        return accumulator
                    }, 0)

                    setTotalAccumulatedTime(totalAccumulatedTime)
                }
            }
        } catch (error) {
            console.error('Failed to fetch time registrations', error)
        }
    }

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)
        fetchTimeRegistrations(selectedValue)

        const monthWorkdaysRes = monthWorkdays(selectedSprint?.sprintMonth, selectedSprint?.sprintYear)
        setWorkDays(monthWorkdaysRes)
    }

    useEffect(() => {
        fetchTimeRegistrations(activeSprint?.sprintId)

        // const monthWorkdaysRes = monthWorkdays("September", "2023")
        const monthWorkdaysRes = monthWorkdays(activeSprint?.sprintMonth, activeSprint?.sprintYear)
        setWorkDays(monthWorkdaysRes)
    }, [activeSprint])

    return (
        <div id='dashboardPage'>
            <PageHeading 
                heading="Dashboard"
                subHeading={`Welcome to your user dashboard`}
                suffix="A quick overview of your data"
            />

            <DashboardFilters
                onSelectedSprint={handleSprintChange}
            ></DashboardFilters>
            

            <section className='grid grid-cols-3 gap-10 mb-10'>
                <span>
                    <Card className="h-full">
                        <div>
                            <span className="flex flex-col gap-2 mb-5">
                                <h3 className="font-bold">Your Time Registered This Sprint</h3>
                                <h2 className="text-4xl font-bold">{totalAccumulatedTime} hours</h2>
                            </span>
                            
                            <span className="flex flex-col gap-2">
                                <span className="relative">
                                    <span className="line absolute block h-[2px] bg-slate-100 w-full"></span>
                                    <span 
                                        className={`line absolute block h-[2px] bg-slate-500`}
                                        style={{ width: `${parseFloat((totalAccumulatedTime / (workDays * 8))*100, 2).toFixed(0)}%` }}
                                        ></span>
                                </span>
                                <p>{parseFloat((totalAccumulatedTime / (workDays * 8))*100, 2).toFixed(2)}% of total ({workDays * 8} hours)</p>
                                <p></p>
                            </span>
                        </div>
                    </Card>
                </span>

                <span>
                    <Card className="h-full">
                        <span className="flex flex-col gap-2 mb-5">
                            <h3 className="font-bold">Total allocated time this sprint</h3>
                            <h2 className="text-4xl font-bold">{`...`} hours</h2>
                        </span>

                        <span className="flex flex-col gap-2">
                            <span className="relative">
                                <span className="line absolute block h-[2px] bg-slate-100 w-full"></span>
                                <span 
                                    className={`line absolute block h-[2px] bg-slate-500`}
                                    style={{ width: `50%` }}
                                    ></span>
                            </span>
                            <p>{`50`}% of total ({`200`} hours)</p>
                            <p></p>
                        </span>
                    </Card>
                </span>

                <span>
                    <Card className="h-full">
                        <span className="flex flex-col gap-2 mb-5">
                            <h3 className="font-bold">Finished tasks this sprint</h3>
                            <h2 className="text-4xl font-bold">{`...`} tasks</h2>
                        </span>

                        <span className="flex flex-col gap-2">
                            <span className="relative">
                                <span className="line absolute block h-[2px] bg-slate-100 w-full"></span>
                                <span 
                                    className={`line absolute block h-[2px] bg-slate-500`}
                                    style={{ width: `50%` }}
                                    ></span>
                            </span>
                            <p>{`50`}% of total ({`200`} tasks)</p>
                            <p></p>
                        </span>
                    </Card>
                </span>
            </section>
        </div>
    )
}

export default Dashboard
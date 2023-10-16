import React, { useContext, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import PageHeading from '../components/PageHeading'
import DashboardFilters from "../components/dashboard/DashboardFilters"
import DashboardCards from "../components/dashboard/DashboardCards"
import { UserContext } from '../context/UserContext'
import { useEffect } from "react"
import getCurrentSprint from "../functions/getCurrentSprint"
import monthWorkdays from "../functions/monthWorkdays"
import { Card } from "flowbite-react"
import DashboardWeeklyChart from "../components/dashboard/DashboardWeeklyChart"

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [selectedSprint, setSelectedSprint] = useState("")
    const activeSprint  = getCurrentSprint()
    const [workDays, setWorkDays] = useState("")
    const [tasks, setTasks] = useState([])
    
    const [timeRegistered, setTimeRegistered] = useState([])
    const [totalAccumulatedTime, setTotalAccumulatedTime] = useState("")
    const [totalAllocatedTimeLow, setTotalAllocatedTimeLow] = useState("")
    const [totalAllocatedTimeHigh, setTotalAllocatedTimeHigh] = useState("")
    const [finishedTasks, setFinishedTasks] = useState([])

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

    const fetchTasksByUserAndSprint = async (activeSprintArray) => {
        try {
            if (activeSprintArray && activeSprintArray.sprintMonth) {
                const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user-sprint/${user.id}?month=${activeSprintArray.sprintMonth}&year=${activeSprintArray.sprintYear}`)

                const totalAllocatedTimeLow = response.data.reduce((accumulator, time) => {
                    const userTaskPerson = time.taskPersons.find(
                        (person) => person.user._id === user.id
                    )
                    const timeValueLow = parseFloat((userTaskPerson.percentage / 100) * time?.taskTimeLow)
                    
                    if (!isNaN(timeValueLow)) {
                        accumulator += timeValueLow;
                    }
                    return accumulator
                }, 0)

                const totalAllocatedTimeHigh = response.data.reduce((accumulator, time) => {
                    const userTaskPerson = time.taskPersons.find(
                        (person) => person.user._id === user.id
                    )
                    const timeValueHigh = parseFloat((userTaskPerson.percentage / 100) * time?.taskTimeHigh)

                    if (!isNaN(timeValueHigh)) {
                        accumulator += timeValueHigh;
                    }
                    return accumulator
                }, 0)

                const finishedTasks = response.data.filter(task => task.workflowStatus === 3);

                setTotalAllocatedTimeLow(totalAllocatedTimeLow)
                setTotalAllocatedTimeHigh(totalAllocatedTimeHigh)
                setFinishedTasks(finishedTasks)

                setTasks(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch tasks', error)
        }
    }

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)
        fetchTimeRegistrations(selectedValue)
        fetchTasksByUserAndSprint(selectedSprint)

        const monthWorkdaysRes = monthWorkdays(selectedSprint?.sprintMonth, selectedSprint?.sprintYear)
        setWorkDays(monthWorkdaysRes)
    }

    useEffect(() => {
        fetchTimeRegistrations(activeSprint?.sprintId)
        fetchTasksByUserAndSprint(activeSprint)

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
            

            <section id="topCards" className='grid grid-cols-3 gap-10 mb-10'>
                <DashboardCards
                    totalAccumulatedTime={totalAccumulatedTime}
                    workDays={workDays}
                    finishedTasks={finishedTasks}
                    tasks={tasks}
                    totalAllocatedTimeLow={totalAllocatedTimeLow}
                    totalAllocatedTimeHigh={totalAllocatedTimeHigh}
                ></DashboardCards>
            </section>

            <section id="timeRegsWeekly" className="grid grid-cols-2 gap-10 mb-10">
                <span>
                    <Card className="h-full">
                        <div>
                            <span className="flex flex-col gap-2 mb-5">
                                <h3 className="font-bold">Your time registrations this week</h3>
                            </span>

                            <span className="flex flex-col gap-2">
                                <DashboardWeeklyChart
                                    fetchTimeRegistrations={timeRegistered}
                                ></DashboardWeeklyChart>
                            </span>
                        </div>
                    </Card>
                </span>

                <span>
                    {/* // TODO: Finish this card */}
                    <Card className="h-full">
                        <h3 className="font-bold">Your recent activity</h3>
                        <div id="recentActivity" className="grid grid-cols-2 place-items-center text-center">
                            <div className="w-full py-5 px-2 border-r border-b border-solid border-gray-100">
                                <h2 className="text-indigo-500 font-bold">42%</h2>
                                <p>Intern time</p>
                            </div>
                            <div className="w-full py-5 px-2 border-l border-b border-solid border-gray-100">
                                <h2 className="text-indigo-500 font-bold">12%</h2>
                                <p>Client time</p>
                            </div>
                            <div className="w-full py-5 px-2 border-r border-t border-solid border-gray-100">
                                <h2 className="text-purple-500 font-bold">62%</h2>
                                <p>Off time</p>
                            </div>
                            <div className="w-full py-5 px-2 border-l border-t border-solid border-gray-100">
                                <h2 className="text-purple-500 font-bold">12%</h2>
                                <p>Sick time</p>
                            </div>
                        </div>
                        
                        <span>
                            <p>Percentage allocated from time registrations based on task information.</p>
                        </span>
                    </Card>
                </span>
            </section>
        </div>
    )
}

export default Dashboard
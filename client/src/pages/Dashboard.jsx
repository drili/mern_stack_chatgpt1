import React, { useContext, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import PageHeading from '../components/PageHeading'
import { Card } from "flowbite-react"
import DashboardFilters from "../components/dashboard/DashboardFilters"
import { UserContext } from '../context/UserContext'
import { useEffect } from "react"
import getCurrentSprint from "../functions/getCurrentSprint"

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [selectedSprint, setSelectedSprint] = useState("")
    const activeSprint  = getCurrentSprint()
    
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

    const handleSprintChange = (selectedValue) => {
        setSelectedSprint(selectedValue)
        fetchTimeRegistrations(selectedValue)
    }

    useEffect(() => {
        fetchTimeRegistrations(activeSprint?.sprintId)
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
                    <Card>
                        {/* TODO: (WIP) Finish this card */}
                        <div>
                            <h3 className="font-bold">Your Time Registered This Sprint</h3>
                            <h1 className="font-bold">{totalAccumulatedTime} hours</h1>
                            
                        </div>
                    </Card>
                </span>

                <span>

                </span>

                <span>

                </span>
            </section>
        </div>
    )
}

export default Dashboard
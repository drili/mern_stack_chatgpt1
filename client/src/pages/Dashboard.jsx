import React, { useContext, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import PageHeading from '../components/PageHeading'
import { Card } from "flowbite-react"
import DashboardFilters from "../components/dashboard/DashboardFilters"

const Dashboard = () => {
    const [selectedSprint, setSelectedSprint] = useState("")

    const handleSprintChange = (selectedValue) => {
        console.log({ selectedValue })
        setSelectedSprint(selectedValue)
    }

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
                        <div>
                            <h3 className="font-bold">Time Registered This Sprint</h3>
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
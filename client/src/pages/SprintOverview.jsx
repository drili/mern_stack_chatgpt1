import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import SprintOverviewFilters from '../components/sprintoverview/SprintOverviewFilters'
import DefaultAccordion from '../components/sprintoverview/Accordion'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const SprintOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [activeUsers, setActiveUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)
        setActiveUsers([])
        setIsLoading(true)

        fetchActiveUsers();
    }
    
    const fetchActiveUsers = async () => {
        console.log(`::: fetchActiveUsers()`);
        try {
            const response = await axios.get(`http://localhost:5000/users/fetch-active-users`)
            if (response.status == 200) {
                setTimeout(() => {
                    setActiveUsers(response.data)
                    setIsLoading(false)
                }, 250)
            }

        } catch (error) {
            console.error('Failed to fetch active users', error)
        }
    }

    useEffect(() => {
        fetchActiveUsers()
    }, [])

    return (
        <div id="SprintOverviewPage">
            <PageHeading
                heading="Sprint Overview"
                subHeading={`An overview of your sprint`}
                suffix="Toggle between persons & customers, and filter by sprint."
            />

            <SprintOverviewFilters
                onSelectedSprint={handleSprintChange}
            ></SprintOverviewFilters>

            <section id="sprintOverviewFields" className='flex flex-col gap-4 relative'>
                {/* // TODO: Iterate fields
                    SEE: https://cdn.dribbble.com/userupload/5436969/file/original-909df9bc5700b070aa88233b85601a7c.png?resize=1024x768
                    SEE: https://dribbble.com/shots/19338145-SaaS-Analytics-Dashboard */}

                {isLoading ? (
                    <div className="absolute top-5 left-0 w-full h-full flex items-center justify-center">
                        <FaSpinner className="animate-spin text-indigo-500 text-4xl" />
                    </div>
                ) : (
                    activeUsers &&
                    activeUsers
                        .slice()
                        .sort((a, b) => a.username.localeCompare(b.username))
                        .map((userObj) => (
                            <DefaultAccordion 
                                key={userObj._id} 
                                userObject={userObj}
                                selectedSprint={selectedSprint} />
                        ))
                )}
            </section>
            
        </div>
    )
}

export default SprintOverview
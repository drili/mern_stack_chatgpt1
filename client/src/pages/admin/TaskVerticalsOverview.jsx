import React, { useState, useContext, useEffect } from 'react'
import PageHeading from '../../components/PageHeading'
import TimeRegVerticalsOverviewFilter from '../../components/admin/TimeRegVerticalsOverviewFilter'
import getCurrentSprint from '../../functions/getCurrentSprint'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import { Accordion, Table } from 'flowbite-react'

const TaskVerticalsOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [timeRegistrations, setTimeRegistrations] = useState([])
    const activeSprint = getCurrentSprint()

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedSprint)
        setIsLoading(true)

        fetchTimeRegsVerticals(selectedSprint?._id)
    }

    const fetchTimeRegsVerticals = async (sprintId) => {
        if (!sprintId) {
            return
        }

        try {
            const response = await axios.get(`http://localhost:5000/time-registrations/time-registrations-verticals-aggregated/${sprintId}`)
            console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch time registrations', error)
        }
    }

    useEffect(() => {
        if (activeSprint?.sprintId) {

            fetchTimeRegsVerticals(activeSprint?.sprintId)
        }
    }, [activeSprint])

    return (
        <div id='TaskVerticalsOverviewPage'>
            <PageHeading
                heading="Task Verticals Overview"
                subHeading={`Overview of task time registration pr. vertical`}
                suffix=""
            />

            {/* // TODO: Finish this view */}
            <TimeRegVerticalsOverviewFilter
                onSelectedSprint={handleSprintChange}
            />

        </div>
    )
}

export default TaskVerticalsOverview
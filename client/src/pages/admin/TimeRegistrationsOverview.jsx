import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Table } from 'flowbite-react'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'

import PageHeading from '../../components/PageHeading'
import TimeRegOverviewFilter from '../../components/admin/TimeRegOverviewFilter'
import CustomCodeBlock from '../../components/CustomCodeBlock'
import getCurrentSprint from '../../functions/getCurrentSprint'
import { ConfigContext } from '../../context/ConfigContext'

const TimeRegistrationsOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [timeRegistrations, setTimeRegistrations] = useState([])
    const activeSprint = getCurrentSprint()

    const { baseURL } = useContext(ConfigContext);

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedSprint)
        setIsLoading(true)

        fetchTimeRegs(selectedSprint?._id)
    }

    const fetchTimeRegs = async (sprintId) => {
        if (!sprintId) {
            return
        }

        try {
            const response = await axios.get(`${baseURL}/time-registrations/fetch-users-time-regs-by-sprint/${sprintId}`)

            if (response.status == 200) {
                setTimeout(() => {
                    setTimeRegistrations(response.data)
                    setIsLoading(false)
                }, 200)
            }
        } catch (error) {
            console.error('Failed to fetch time registrations', error)
        }
    }

    useEffect(() => {
        if (activeSprint?.sprintId) {

            fetchTimeRegs(activeSprint?.sprintId)
        }
    }, [activeSprint])

    return (
        <div id='TimeRegistrationsOverview'>
            <PageHeading
                heading="Time Registrations Overview"
                subHeading={`An overview of time registrations pr. user`}
                suffix="Select the different filter options to filter the table."
            />

            <TimeRegOverviewFilter
                onSelectedSprint={handleSprintChange}
            />

            <div id='TimeRegistrationsOverview-table'>
                <Accordion collapseAll={false}>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <span className='flex gap-5 items-center'>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Time Registrations in {selectedSprint ? selectedSprint?.sprintName : `${activeSprint.sprintMonth} ${activeSprint.sprintYear}`}
                                </h2>
                            </span>
                        </Accordion.Title>

                        <Accordion.Content>
                            <section>
                                <Table className='relative'>
                                    <Table.Head>
                                        <Table.HeadCell className='text-left'>
                                            Name
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            Total Time Registered
                                        </Table.HeadCell>

                                        <Table.HeadCell className='text-left'>
                                            Intern Time
                                        </Table.HeadCell>

                                        <Table.HeadCell className='text-left'>
                                            Client Time
                                        </Table.HeadCell>

                                        <Table.HeadCell className='text-left'>
                                            Off- & Sicktime
                                        </Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y">
                                        {isLoading ? (
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell>
                                                    <div className="absolute top-5 left-0 w-full h-full flex items-center justify-center">
                                                        <FaSpinner className="animate-spin text-rose-500 text-4xl" />
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ) : (
                                            timeRegistrations &&
                                            timeRegistrations.map((regs) => (
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={regs._id}>
                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {regs.username}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {regs.totalTime}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {regs.internTime}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {regs.clientTime}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {regs.restTime}
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        )}

                                    </Table.Body>
                                </Table>
                            </section>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    )
}

export default TimeRegistrationsOverview
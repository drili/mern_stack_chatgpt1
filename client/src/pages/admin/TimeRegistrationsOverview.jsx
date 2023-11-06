import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading'
import TimeRegOverviewFilter from '../../components/admin/TimeRegOverviewFilter'
import { Accordion, Table } from 'flowbite-react'
import CustomCodeBlock from '../../components/CustomCodeBlock'

const TimeRegistrationsOverview = () => {
    const [selectedSprint, setSelectedSprint] = useState("")
    const [activeUsers, setActiveUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedSprint)
        setIsLoading(true)
    }

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
                                    Time Registrations in <CustomCodeBlock text="PLACEHOLDER: SPRINT" />
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
                                            Time Registered
                                        </Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <CustomCodeBlock text="PLACEHOLDER: USERNAME" />
                                            </Table.Cell>

                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                <CustomCodeBlock text="PLACEHOLDER: TIME_REGISTERED" />
                                            </Table.Cell>
                                        </Table.Row>
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
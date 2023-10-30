import React from 'react'
import { Table } from 'flowbite-react'

const TimeRegistrationTable = ({ eventObj }) => {
    return (
        <div>
            <Table className='relative'>
                <Table.Head>
                    <Table.HeadCell className='text-left'>
                        Task Name
                    </Table.HeadCell>
                    {/* <Table.HeadCell className='text-left'>
                        Client
                    </Table.HeadCell> */}
                    <Table.HeadCell className='text-left'>
                        Time
                    </Table.HeadCell>
                    <Table.HeadCell className='text-left'>
                        Edit
                    </Table.HeadCell>
                    <Table.HeadCell className='text-left'>
                        Delete
                    </Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y">
                    {eventObj &&
                        eventObj.map(event => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={event._id}>
                                <Table.Cell className="whitespace-break-spaces font-medium text-gray-900 dark:text-white text-xs leading-3">
                                    {event.taskId.taskName}
                                </Table.Cell>
                                {/* <Table.Cell className='whitespace-break-spaces'>
                                    {event.taskId.taskCustomer}
                                </Table.Cell> */}
                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    {event.timeRegistered}
                                </Table.Cell>

                                {/* // TODO: Add functions to save/edit & delete time registrations */}
                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    <a
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 text-xs"
                                        // onClick={() => handleTaskModal(data._id)}
                                    >
                                    <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                        Save
                                    </p>
                                    </a>
                                </Table.Cell>
                                <Table.Cell className='whitespace-break-spaces text-xs'>
                                    <a
                                        className="font-medium text-red-500 hover:underline dark:text-cyan-500 text-xs"
                                        // onClick={() => handleTaskModal(data._id)}
                                    >
                                    <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                        Delete
                                    </p>
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default TimeRegistrationTable
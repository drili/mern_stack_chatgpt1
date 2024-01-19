import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import { FaSpinner } from 'react-icons/fa'
import DashboardTeamEffortsDoughnutChart from './DashboardTeamEffortsDoughnutChart'

const DashboardTeamEfforts = ({ registrationData, activeSprint }) => {
    // console.log({ registrationData });
    const [isLoading, setIsLoading] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(() => {
        setIsLoading(false)
        setImageSrc("http://localhost:5000/uploads/")
    }, [registrationData])

    return (
        <div id='DashboardTeamEfforts'>
            <section className='mb-10'>
                <h2 className='font-bold'>Team Effort In <span className='text-amber-400'>{activeSprint.sprintMonth} {activeSprint.sprintYear}</span></h2>
            </section>
            <>
                <div className='overflow-x-auto'>
                    <Table className='min-w-full relative'>
                        <Table.Head>
                            <Table.HeadCell className='text-left'>
                                User
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

                            <Table.HeadCell className='text-left'>
                                Attribution
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
                                registrationData &&
                                registrationData.map((regs) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={regs._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div className='flex gap-4 items-center'>
                                                <span className='w-[40px] h-[40px]'>
                                                    <img
                                                        className='w-[40px] h-[40px] rounded-full object-cover ml-2'
                                                        src={`${imageSrc}${regs.profileImage}`} /
                                                    >
                                                </span>
                                                <span>
                                                    {regs.username}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white font-bold underline">
                                            {regs.totalTime} hours
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {regs.internTime} hours
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {regs.clientTime} hours
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {regs.restTime} hours
                                        </Table.Cell>

                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div className='max-h-[50px]'>
                                                {regs.totalTime > 0 ? (
                                                    <DashboardTeamEffortsDoughnutChart
                                                        data={regs}
                                                    />
                                                ) : (
                                                    <div></div>
                                                )}
                                            </div>
                                        </Table.Cell>

                                    </Table.Row>
                                ))
                            )}

                        </Table.Body>
                    </Table>
                </div>
            </>
        </div>
    )
}

export default DashboardTeamEfforts
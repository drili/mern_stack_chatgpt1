import { useContext, useEffect, useState } from 'react'
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoIosCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { Accordion, Table } from 'flowbite-react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import TaskModal from '../task/TaskModal'
import { UserContext } from '../../context/UserContext'
import getCurrentSprint from '../../functions/getCurrentSprint'
import { ConfigContext } from '../../context/ConfigContext';

const CustomerAccordion = ({ customerObject, selectedSprint }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sprintData, setSprintData] = useState([])
    const currentSprint = getCurrentSprint()
    const [accumulatedValues, setAccumulatedValues] = useState({})
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const { user } = useContext(UserContext)
    const { baseURL } = useContext(ConfigContext);

    const fetchTasks = () => {
        return
    }

    const handleTaskModal = (taskId) => {
        setShowModal(true)
        setSelectedTaskId(taskId)
    }

    const onCloseModal = () => {
        setShowModal(false)
        toast.dismiss()
    }

    const fetchSprintData = async (activeSprintArray) => {
        try {
            const response = await axios.get(`${baseURL}/tasks/fetch-by-customer-sprint/${customerObject._id}?month=${activeSprintArray.sprintMonth}&year=${activeSprintArray.sprintYear}&time_reg=1`)
            
            setSprintData(response.data)

            // *** Accumulated data
            const userAccumulatedValues = {}
            response.data.forEach(data => {
                const customerId = data.taskCustomer._id
                const taskTimeLow = data.taskTimeLow
                const taskTimeHigh = data.taskTimeHigh

                if(!userAccumulatedValues[customerId]) {
                    userAccumulatedValues[customerId] = {
                        low: 0,
                        high: 0
                    }
                }

                userAccumulatedValues[customerId].low += taskTimeLow;
                userAccumulatedValues[customerId].high += taskTimeHigh;
            })
            // console.log({userAccumulatedValues});
            setAccumulatedValues(userAccumulatedValues);
        } catch (error) {
            console.error('Failed to fetch tasks', error)
            
        }
    }

    const sprintOverviewFetch = () => {
        if (!selectedSprint) {
            fetchSprintData(currentSprint)
        } else {
            fetchSprintData(selectedSprint)
        }
    }

    useEffect(() => {
        const titleElement = document.querySelector(`#taskId_${customerObject._id}`);
        if (titleElement) {
            titleElement.addEventListener('click', () => {
                setIsOpen((prevIsOpen) => !prevIsOpen)
            })
        }
    }, [])

    useEffect(() => {
        if (!selectedSprint) {
            if (currentSprint.month != "") {
                fetchSprintData(currentSprint)
            }
        } else {
            fetchSprintData(selectedSprint)
        }
    }, [currentSprint])

    useEffect(() => {
        if (isOpen) {
            if (!selectedSprint) {
                fetchSprintData(currentSprint)
            } else {
                fetchSprintData(selectedSprint)
            }
        } else {
            setSprintData([])
        }
    }, [isOpen])

    return (
        <div>
            <>
                <Accordion collapseAll >
                    <Accordion.Panel>
                        <Accordion.Title id={`taskId_${customerObject._id}`}>
                            <span className='flex gap-5 items-center pb-3 pt-3'>
                                <div className='flex gap-5 items-center'>
                                    <span>
                                        <span className='flex gap-3'>
                                            <h2 className='text-lg font-bold text-gray-900'>{customerObject.customerName}</h2>
                                        </span>
                                    </span>
                                </div>

                                <div className='absolute right-[100px] translate-y-[-5px]'>
                                    {accumulatedValues[customerObject._id] ? (
                                        <div id="taskInfoLabels" className='flex gap-4'>
                                            <span className='text-center'>
                                                <label htmlFor="" className='text-sm'>Low</label>
                                                {accumulatedValues[customerObject._id] ? (
                                                    <p className='bg-rose-900 text-white rounded-md text-sm py-2 px-2 min-w-[50px]'>{accumulatedValues[customerObject._id].low}</p>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>

                                            <span className='text-center'>
                                                <label htmlFor="" className='text-sm'>High</label>
                                                {accumulatedValues[customerObject._id] ? (
                                                    <p className='bg-rose-900 text-white rounded-md text-sm py-2 px-2 min-w-[50px]'>{accumulatedValues[customerObject._id].high}</p>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>

                                            <span className='text-center'>
                                                <label htmlFor="" className='text-sm'>Median</label>
                                                {accumulatedValues[customerObject._id] ? (
                                                    <p className='bg-rose-900 text-white rounded-md text-sm py-2 px-2 min-w-[50px]'>{(accumulatedValues[customerObject._id].low + accumulatedValues[customerObject._id].high) / 2}</p>
                                                ) : (
                                                    <></>
                                                )}
                                            </span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </span>
                        </Accordion.Title>
                        <Accordion.Content>
                            {isOpen ? (
                                <>
                                    <Table className='relative'>
                                        <Table.Head>
                                            <Table.HeadCell className='text-left'>
                                                Task Name
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-left'>
                                                Customer
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-left'>
                                                Low
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-left'>
                                                High
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-left'>
                                                Percent Allocation
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-left'>
                                                Time Registered
                                            </Table.HeadCell>
                                            <Table.HeadCell className='text-center'>
                                                Done
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {sprintData.map((data) => (
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data._id}>
                                                    <Table.Cell className="flex items-center gap-2 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <p className='w-[250px] text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{data.taskName}</p>
                                                        {data.taskType === "timedTask" ? (
                                                            <BsFillLightningChargeFill className='text-amber-500' />
                                                        ) : null}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className='text-xs'>{data.taskCustomer.customerName}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className='text-xs'>{data.taskTimeLow}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className='text-xs'>{data.taskTimeHigh}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {data.taskPersons
                                                            .filter(person => person.user._id === user.id)
                                                            .map(taskPerson => (
                                                                <div className='text-xs' key={taskPerson._id}>{taskPerson.percentage.toFixed(2)}</div>
                                                            ))
                                                        }
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className='text-xs font-extrabold underline'>{data.timeRegistrations.reduce((totalTime, registration) => totalTime + registration.timeRegistered, 0)}</p>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        {data.workflowStatus === 3 ? (
                                                            <p className='flex items-center justify-center text-lg text-green-500 font-bold'>
                                                                <IoIosCheckmarkCircle />
                                                            </p>
                                                        ) : (
                                                            <p className='flex items-center justify-center text-lg text-red-500 font-bold'>
                                                                <IoMdCloseCircle />
                                                            </p>
                                                        )}
                                                    </Table.Cell>

                                                    {/* <Table.Cell>
                                                        <p className='font-thin text-slate-500 text-xs'>TBU</p>
                                                    </Table.Cell> */}
                                                    <Table.Cell>
                                                        <a
                                                            className="font-medium cursor-pointer text-slate-500 hover:underline dark:text-cyan-500"
                                                            onClick={() => handleTaskModal(data._id)}
                                                        >
                                                            <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                                                Open
                                                            </p>
                                                        </a>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </>
                            ) : (
                                null
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>

                <TaskModal
                    taskID={selectedTaskId}
                    showModalState={showModal}
                    onCloseModal={onCloseModal}
                    fetchTasks={fetchTasks}
                    // sprintOverviewFetch={sprintOverviewFetch}
                    updateFunc={sprintOverviewFetch}
                />
            </>
        </div>
    )
}

export default CustomerAccordion
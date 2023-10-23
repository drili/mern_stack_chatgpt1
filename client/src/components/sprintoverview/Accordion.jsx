import { useContext, useEffect, useState } from 'react'
import { Accordion, Table } from 'flowbite-react'
import { UserContext } from '../../context/UserContext'
import getCurrentSprint from '../../functions/getCurrentSprint'
import axios from 'axios'

const DefaultAccordion = ({ userObject, selectedSprint }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sprintData, setSprintData] = useState([])
    const { user } = useContext(UserContext)
    const currentSprint  = getCurrentSprint()

    useEffect(() => {
        const titleElement = document.querySelector(`#taskId_${userObject._id}`);
        if (titleElement) {
            titleElement.addEventListener('click', () => {
                setIsOpen((prevIsOpen) => !prevIsOpen)
            })
        }        
    }, [])

    const fetchSprintData = async (activeSprintArray) => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user-sprint/${userObject._id}?month=${activeSprintArray.sprintMonth}&year=${activeSprintArray.sprintYear}&time_reg=1`)

            console.log(response.data)
            setSprintData(response.data)
        } catch (error) {
            console.error('Failed to fetch tasks', error)
        }
    }

    useEffect(() => {
        if (isOpen) {
            if (!selectedSprint) {
                fetchSprintData(currentSprint)
                console.log({currentSprint});
            } else {
                fetchSprintData(selectedSprint)
                console.log({selectedSprint});
            }
        } else {
            setSprintData([])
            // console.log(`${userObject._id} is CLOSED`);
        }
    }, [isOpen])

    return (
        <Accordion collapseAll >
            <Accordion.Panel>
                <Accordion.Title id={`taskId_${userObject._id}`} className={user.id === userObject._id ? "bg-indigo-50 rounded-none" : ""}>
                    <span className='flex gap-5 items-center'>
                        <img
                            className='w-[60px] h-[60px] rounded-full object-cover'
                            src={`http://localhost:5000/uploads/${userObject.profileImage}`}
                        />
                        <span>
                            <span className='flex gap-3'>
                                <h2 className='text-lg font-bold text-gray-900'>{userObject.username}</h2>
                                <label className='bg-indigo-100 text-indigo-800 rounded-md py-1 px-2 text-xs font-bold h-fit'>{userObject.userTitle}</label>
                            </span>
                            <h2 className='text-sm font-light text-zinc-500'>{userObject.email}</h2>
                        </span>
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
                                        Task Status
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
                                    <Table.HeadCell className='text-left'>
                                        Remaining Task Time
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                {sprintData.map((data) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={data._id}>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {data.taskName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.taskCustomer.customerName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.workflowStatus}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.taskTimeLow}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.taskTimeHigh}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.taskPersons
                                                .filter(person => person.user._id === user.id)
                                                .map(taskPerson => (
                                                    <div key={taskPerson._id}>{taskPerson.percentage}</div>
                                                ))
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            {data.timeRegistrations.reduce((totalTime, registration) => totalTime + registration.timeRegistered, 0)}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <p className='font-thin text-slate-500 text-xs'>TBU</p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <a
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                            href="/tables"
                                            >
                                            <p>
                                                Edit Task
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
    )
}

export default DefaultAccordion;

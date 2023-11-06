import React, { useEffect, useState } from 'react'
import PageHeading from '../../components/PageHeading'
import { Accordion, Table } from 'flowbite-react'
import CustomCodeBlock from '../../components/CustomCodeBlock'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'

// TODO: Add state management to usersData, so input fields can be updated.

const PersonsOverview = () => {
    const [usersData, setUsersData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)

    const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500"
    const labelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/fetch-all-users`)
            if (response.status === 200) {
                setUsersData(response.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 250);
            }
        } catch (error) {
            console.error('Failed to fetch all users', error)
        }
    }

    const handleEditUser = async () => {

    }

    useEffect(() => {
        setImageSrc("http://localhost:5000/uploads/")
        fetchUsers()
    }, [])

    return (
        <div id='PersonsOverviewPage'>
            <PageHeading
                heading="Users Overview"
                subHeading={`An overview of active and archived users`}
                suffix="Edit users and their information below."
            />


            <div id='PersonsOverviewPage-table'>
                <Accordion collapseAll={false}>
                    <Accordion.Panel>
                        <Accordion.Title>
                            <span className='flex gap-5 items-center'>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Overview of all active and archived users
                                </h2>
                            </span>
                        </Accordion.Title>

                        <Accordion.Content>
                            <section className='overflow-x-auto'>
                                <Table className='relative'>
                                    <Table.Head>
                                        <Table.HeadCell className='text-left'>
                                            User ID
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            User Status
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            Profile Image
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            User Email
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            Username
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            Password
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            User Title
                                        </Table.HeadCell>
                                        <Table.HeadCell className='text-left'>
                                            Role
                                        </Table.HeadCell>
                                    </Table.Head>

                                    <Table.Body className="divide-y">
                                        {isLoading ? (
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                <Table.Cell>
                                                    <div className="absolute top-5 left-0 w-full h-full flex items-center justify-center">
                                                        <FaSpinner className="animate-spin text-indigo-500 text-4xl" />
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ) : (
                                            usersData &&
                                            usersData.map((user) => (
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user._id}>
                                                    <Table.Cell className="whitespace-nowrap font-light text-gray-900 dark:text-white">
                                                        <input className={inputClasses} value={user._id} disabled />
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {user.isActivated === true ? "Active" : "Archived"}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <img 
                                                        className='w-[40px] h-[40px] rounded-full object-cover ml-2'
                                                        src={`${imageSrc}${user.profileImage}`} /
                                                        >
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <input className={inputClasses} type='text' value={user.email} />
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <input className={inputClasses} type='text' value={user.username} />
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <input className={inputClasses} type='password' value={user.password} />
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        {user.userRole === 1 ? "admin" : "default"}
                                                    </Table.Cell>

                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <input className={inputClasses} type='text' value={user.userTitle} />
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <a
                                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                            onClick={() => handleEditUser()}
                                                        >
                                                            <p className='border border-gray-300 rounded-lg text-center px-2 py-1 font-bold text-xs'>
                                                                Update
                                                            </p>
                                                        </a>
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
        </div >
    )
}

export default PersonsOverview
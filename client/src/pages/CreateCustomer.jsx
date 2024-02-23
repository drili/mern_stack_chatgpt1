import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import GenericForm from '../components/GenericForm'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { BsFillTrashFill } from "react-icons/bs"
import { AiOutlineUndo } from "react-icons/ai"
import { ConfigContext } from '../context/ConfigContext';

const CreateCustomer = () => {
    const [customers, setCustomers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showArchived, setShowArchived] = useState(false)

    const { baseURL } = useContext(ConfigContext);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(baseURL + "/customers/fetch")
            setCustomers(response.data)
        } catch (error) {
            console.error('Failed to fetch customers', error);
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    const filteredCustomers = customers.filter((customer) => {
        const customerName = customer.customerName.toLowerCase()
        const query = searchQuery.toLowerCase()
        return customerName.includes(query)
    })

    const handleCreateCustomer = async (data) => {
        if (!data) {
            return
        }

        const customerData = {
            customerName: data[0],
            customerColor:  data[1]
        }

        try {
            const response = await axios.post(baseURL + "/customers/create", customerData)
            fetchCustomers()

            if (response.status === 200) {
                toast('Customer has successfully created', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })
            }
        } catch (error) {
            console.error('Failed to create customer', error);
            toast('There was an error creating customer', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: "#fff"
                }
            })
        }
    }

    const handleArchiveCustomer = async (customerId) => {
        try {
            await axios.put(`${baseURL}/customers/archive/${customerId}`)
            fetchCustomers()
            console.log("Customer archived successfully");
        } catch (error) {
            console.error("Failed to delete customer", error);
        }
    }

    const handleUnArchiveCustomer = async (customerId) => {
        try {
            await axios.put(`${baseURL}/customers/unarchive/${customerId}`)
            fetchCustomers()
            console.log("Customer un-archived successfully");
        } catch (error) {
            console.error("Failed to delete customer", error);
        }
    }

    const archivedCustomersCount = customers.filter(customer => !customer.isArchived).length
    const customerCount = customers.length

    return (
        <div id="createCustomerPage">
            <PageHeading 
                heading="Create Customer"
                subHeading={`A section to create new customers`}
                suffix=""
            />

            <section className='grid grid-cols-2 gap-10 mb-10'>
                <span>
                    <div className='shadow-md p-10 rounded-lg mb-10'>
                        <span>
                            <h2 className='font-bold mb-5'>Create new customer</h2>
                            <hr className='mb-5'/>
                        </span>

                        <GenericForm
                            fieldCount={2}
                            inputTypes={['text', 'color']}
                            fieldNames={[`Customer Name`, `Customer Color`]}
                            fieldValues={['',]}
                            required={[true, true]}
                            formClass="my-form"
                            inputClass="my-input"
                            buttonClass="my-button"
                            onSubmit={(data) => handleCreateCustomer(data)}
                        />
                    </div>
                </span>

                <span>
                    <div className='shadow-md p-10 rounded-lg mb-10 bg-slate-50'>
                        <span>
                            <h2 className='font-bold mb-5'>Customer List ({archivedCustomersCount}/{customerCount})</h2>
                            <hr className='mb-5'/>
                        </span>

                        <span className='search-container grid grid-cols-2 gap-4'>
                            <input
                                type='text'
                                placeholder='Search customers'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 px-4 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            >
                            </input>

                            <div className="flex items-center mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500">
                                <input 
                                    id="bordered-checkbox-1" 
                                    type="checkbox" 
                                    value="" 
                                    name="bordered-checkbox" 
                                    onChange={() => setShowArchived(!showArchived)}
                                    />
                                <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-800">Show archived customers</label>
                            </div>
                        </span>

                        <div>
                            <ul>
                                {filteredCustomers
                                    .filter((customer) => (showArchived ? true : !customer.isArchived))
                                    .map((customer) => (
                                        <li 
                                            key={customer._id}
                                            // style={{ border : `1px solid ${customer.customerColor}` }}
                                            style={{ border: `1px solid #eee` }}
                                            className='mb-2 rounded-lg'
                                            >
                                            <div className='flex text-sm gap-4 justify-between'>
                                                <span 
                                                    className={`block rounded-lg py-2 px-5 bg flex-1`}
                                                    // style={{ background : `${customer.customerColor}` }}
                                                >
                                                    <p 
                                                        
                                                        className='text-sm text-inherit font-bold inline-block px-2 rounded-md'>{customer.customerName}</p>
                                                </span>
                                                {customer.isArchived ? (
                                                        <button className='p-0 px-2 flex gap-2 items-center' onClick={() => handleUnArchiveCustomer(customer._id)}>Un-Acrhive <AiOutlineUndo/></button>
                                                    ) : (
                                                        <button className='p-0 px-2 flex gap-2 items-center' onClick={() => handleArchiveCustomer(customer._id)}>Archive <BsFillTrashFill/></button>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </span>
            </section>

            <Toaster />
        </div>
    )
}

export default CreateCustomer
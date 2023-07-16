import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import GenericForm from '../components/GenericForm'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


const CreateCustomer = () => {
    const [customers, setCustomers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customers/fetch")
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
            const response = await axios.post("http://localhost:5000/customers/create", customerData)
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

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`http://localhost:5000/customers/delete/${customerId}`)
            fetchCustomers()
            console.log("Customer deleted successfully");
        } catch (error) {
            console.error("Failed to delete customer", error);
        }
    }

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
                            <h2 className='font-bold mb-5'>Customer List ({customers.length})</h2>
                            <hr className='mb-5'/>
                        </span>

                        <span className='search-container'>
                            <input
                                type='text'
                                placeholder='Search customers'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            >
                            </input>
                        </span>

                        <div>
                            <ul>
                                {filteredCustomers.map((customer) => (
                                    <li key={customer._id}>
                                        <div className='flex gap-2 text-sm mb-2'>
                                            <span 
                                                className={`block rounded-lg py-1 px-5 bg`}
                                                style={{ backgroundColor : `${customer.customerColor}` }}
                                            >
                                                {customer.customerName}
                                            </span>
                                            <button className='p-0 px-2' onClick={() => handleDeleteCustomer(customer._id)}>Delete</button>
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
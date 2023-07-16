import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import GenericForm from '../components/GenericForm'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';


const CreateCustomer = () => {
    const [customers, setCustomers] = useState([])

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
                            <h2 className='font-bold mb-5'>Customer List</h2>
                            <hr className='mb-5'/>
                        </span>

                        <div>
                            <ul>
                                {customers.map((customer) => (
                                    <li key={customer._id}>
                                        <div className='flex gap-2'>
                                            <span 
                                                className={`block rounded-lg py-1 px-5 mb-2`}
                                                style={{ backgroundColor : `${customer.customerColor}` }}
                                            >
                                                {customer.customerName}
                                            </span>
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
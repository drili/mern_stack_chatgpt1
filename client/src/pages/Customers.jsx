import React, { useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { Link, useNavigate } from 'react-router-dom';
import getCurrentSprint from '../functions/getCurrentSprint';
import CustomersFilters from '../components/customers/CustomersFilters';
import monthWorkdays from '../functions/monthWorkdays';
import axios from 'axios';
import { FaHourglassEnd, FaSpinner } from 'react-icons/fa'
import CustomerAccordion from '../components/customers/CustomerAccordion';

const Customers = () => {
    const [sprints, setSprints] = useState([])
    const [currentSprint, setCurrentSprint] = useState([])
    const activeSprint  = getCurrentSprint()
    const [selectedSprint, setSelectedSprint] = useState("")
    const [workDays, setWorkDays] = useState("")

    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedSprint)
        // setActiveUsers([])
        setIsLoading(true)

        fetchCustomers();
    }

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/customers/fetch`)
            setTimeout(() => {
                setCustomers(response.data)
                setIsLoading(false)
            }, 250)
        } catch (error) {
            console.error('Failed to fetch customers', error)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [])

    return (
        <div id="customerPage">
            <PageHeading
                heading="Customers Page"
                subHeading={`Find all relevant customer information here`}
                suffix=""
            ></PageHeading>

            <CustomersFilters
                onSelectedSprint={handleSprintChange}
            />

            <section id='customersFields' className='flex flex-col gap-4 relative'>
                {isLoading ? (
                    <div className="absolute top-5 left-0 w-full h-full flex items-center justify-center">
                        <FaSpinner className="animate-spin text-indigo-500 text-4xl" />
                    </div>
                ) : (
                    customers &&
                    customers
                        .slice()
                        .sort((a, b) => a.customerName.localeCompare(b.customerName))
                        .filter(customer => customer.isArchived === false)
                        .map((customer) => (
                            <CustomerAccordion 
                                key={customer._id}
                                customerObject={customer}
                                selectedSprint={selectedSprint}
                            />
                        ))
                )}
            </section>
        </div>
    )
}

export default Customers
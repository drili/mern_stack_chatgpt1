import React, { useState } from 'react'
import PageHeading from '../components/PageHeading'
import { Link, useNavigate } from 'react-router-dom';
import getCurrentSprint from '../functions/getCurrentSprint';
import CustomersFilters from '../components/customers/CustomersFilters';
import monthWorkdays from '../functions/monthWorkdays';

const Customers = () => {
    const [sprints, setSprints] = useState([])
    const [currentSprint, setCurrentSprint] = useState([])
    const activeSprint  = getCurrentSprint()
    const [selectedSprint, setSelectedSprint] = useState("")
    const [workDays, setWorkDays] = useState("")

    const handleSprintChange = (selectedValue, selectedSprint) => {
        setSelectedSprint(selectedValue)

        const monthWorkdaysRes = monthWorkdays(selectedSprint?.sprintMonth, selectedSprint?.sprintYear)
        setWorkDays(monthWorkdaysRes)
    }

    return (
        // TODO: Finish customer page
        <div id="customerPage">
            <PageHeading
                heading="Customers Page"
                subHeading={`Find all relevant customer information here`}
                suffix=""
            ></PageHeading>

            <CustomersFilters
                onSelectedSprint={handleSprintChange}
            />
        </div>
    )
}

export default Customers
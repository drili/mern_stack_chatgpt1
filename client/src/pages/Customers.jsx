import React from 'react'
import PageHeading from '../components/PageHeading'
import { Link, useNavigate } from 'react-router-dom';

const Customers = () => {
    return (
        // TODO: Finish customer page
        <div id="customerPage">
            <PageHeading
                heading="Customers Page"
                subHeading={`Find all relevant customer information here`}
                suffix=""
            ></PageHeading>

            <div>
                {/* // TODO: Make link to create-customer page */}
                <p>Create Customer</p>
                <Link to="create-customer">Create Customer</Link>
            </div>
        </div>
    )
}

export default Customers
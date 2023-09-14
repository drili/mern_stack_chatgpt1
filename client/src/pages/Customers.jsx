import React from 'react'
import PageHeading from '../components/PageHeading'

const Customers = () => {
    return (
        <div id="customerPage">
            <PageHeading
                heading="Customers Page"
                subHeading={`Find all relevant customer information here`}
                suffix=""
            ></PageHeading>
        </div>
    )
}

export default Customers
import React from 'react'
import PageHeading from '../components/PageHeading';


const NotFound = () => {
    return (
        <div id='NotFound'>
            <PageHeading 
                heading="404 - Page not found"
                subHeading={`The page you are looking for does not exist`}
                suffix=""
            />
        </div>
    )
}

export default NotFound
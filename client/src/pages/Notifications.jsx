import React from 'react'
import PageHeading from '../components/PageHeading'

const Notifications = () => {
    return (
        <div id='NotificationsPage'>
            <PageHeading 
                heading="Your Notifications"
                subHeading={`Navigate through your different notifications`}
                suffix=""
            />
        </div>
    )
}

export default Notifications
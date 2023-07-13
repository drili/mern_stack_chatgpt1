import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import PageHeading from '../components/PageHeading';

const Profile = () => {
    return (
        <div id='profilePage'>
            <PageHeading 
                heading="Profile Page"
                subHeading={`Welcome to the profile page`}
                suffix="A quick overview of your data"
            />
        </div>
    )
}

export default Profile
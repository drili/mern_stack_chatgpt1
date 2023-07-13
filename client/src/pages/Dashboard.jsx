import React, { useContext } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import PageHeading from '../components/PageHeading';

const Dashboard = () => {
    return (
        <div id='dashboardPage'>
            <PageHeading 
                heading="Dashboard"
                subHeading={`Welcome to your user dashboard`}
                suffix="A quick overview of your data"
            />
        </div>
    )
}

export default Dashboard
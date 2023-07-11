import React from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const username = localStorage.getItem("username")

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {username}</p>
        </div>
    )
}

export default Dashboard
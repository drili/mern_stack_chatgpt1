import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const username = localStorage.getItem("username")
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate("/login")
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {username}</p>

            <section>
                <Link to="/profile">Profile Page</Link>
                <button onClick={handleLogout}>Logout</button>
            </section>
        </div>
    )
}

export default Dashboard
import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const username = localStorage.getItem("username")
    const navigate = useNavigate()

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Hello, {username}</p>

            <section>
                <Link to="/dashboard">Dashboard</Link>
            </section>
        </div>
    )
}

export default Profile
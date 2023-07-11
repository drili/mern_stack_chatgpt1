import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const username = localStorage.getItem("username")

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Hello, {username}</p>
        </div>
    )
}

export default Profile
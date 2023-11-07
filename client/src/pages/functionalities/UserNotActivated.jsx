import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from "../../assets/pexels-mathilde-langevin-18713033.jpg"
import { UserContext } from '../../context/UserContext';

const UserNotActivated = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)

    return (
        <div id="UserNotActivated" className='grid grid-cols-2 min-h-[100vh]'>
            <section className="login-form p-40">
                <div className='mb-10 text-center'>
                    <h1 className='font-bold'>Access Restricted</h1>
                </div>

                <div className='flex gap-2 mt-10 text-center m-auto align-center justify-center'>
                    <h5>Your user has not been activated yet, please try again later.</h5>
                    <Link to="/login">Try again</Link>
                </div>
            </section>

            <section className="login-image-field h-[100vh] overflow-hidden">
                <img
                    className=''
                    src={backgroundImage}
                    alt=""
                    loading="lazy" />
            </section>
        </div>
    )
}

export default UserNotActivated
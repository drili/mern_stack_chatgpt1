import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import backgroundImage from "../assets/pexels-feyza-yıldırım-15795337.jpg"
import { UserContext } from '../context/UserContext';
import Logo from '../components/Logo';
import { ConfigContext } from '../context/ConfigContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setHasUnreadNotifications } = useContext(UserContext)

    const { baseURL } = useContext(ConfigContext);

    const navigate = useNavigate();

    const fetchUnreadNotifications = async (userId) => {
        try {
            const response = await axios.post(baseURL + "/notifications/fetch-unread-notifications", {
                userId: userId
            })

            return response
        } catch (error) {
            console.error("Error fetching notifications", error)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            password,
        }

        axios.post(baseURL + '/users/login', user)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem("username", res.data.username)
                localStorage.setItem("email", res.data.user.email)
                localStorage.setItem("is_activated", res.data.user.is_activated)
                localStorage.setItem("profile_image", res.data.user.profile_image)
                localStorage.setItem("user_role", res.data.user.user_role)
                localStorage.setItem("user_title", res.data.user.user_title)
                localStorage.setItem("user", JSON.stringify(res.data.user))

                fetchUnreadNotifications(res.data.user.id).then(response => {
                    const hasUnread = response.data.some(notification => !notification.notificationIsRead);
                    setHasUnreadNotifications(hasUnread);
                })

                setUser(res.data.user)

                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                navigate('/dashboard');
            })
            .catch(err => console.error(err));

        setEmail('');
        setPassword('');
    }

    return (
        <div id="loginFormSection" className='grid grid-cols-2 min-h-[100vh]'>
            <section className="login-form p-40">
                <div className='flex flex-col justify-start mb-10 text-left gap-10'>
                    <Logo />
                    <h1 className='font-bold'>Login</h1>
                </div>
                <form onSubmit={onSubmit}>
                    <div className='mb-6'>
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email Address</label>
                        <input
                            placeholder='Enter your username'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            type="text"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            placeholder='Enter your password'
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='text-center'>
                        <input
                            className='button text-white mt-10 bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'
                            type="submit"
                            value="Login" />
                    </div>
                </form>

                {/* <div className='flex gap-2 mt-10 text-center m-auto align-center justify-center'> */}
                {/* <h5>Don't have an account? </h5> */}
                {/* <Link to="/register">Register account</Link> */}
                {/* </div> */}
            </section>

            <section className="login-image-field h-[100vh] overflow-hidden">
                <img
                    className=''
                    src={backgroundImage}
                    alt=""
                    loading="lazy" />
            </section>
        </div>
    );
}

export default Login
import React, { useState } from "react"
import axios from "axios"
import backgroundImage from "../../assets/pexels-artūras-kokorevas-15986451.jpg"
import { Link, useNavigate } from "react-router-dom"

function Register() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            username, 
            password,
            email,
            isActivated:0,
            profileImage: "",
            userRole:0
        }

        axios.post("http://localhost:5000/users/register", newUser)
            .then(res => (
                navigate("/admin/persons-overview")
            ))
            .catch(err => console.error(err))

        setUsername("")
        setPassword("")
        setEmail("")
    }

    return (
        <div id="loginFormSection" className='grid grid-cols-2 align-center'>
            <section className="login-form p-20">
                <div className='mb-10 text-center'>
                    <h2 className='font-bold'>Register New Account</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <div className='mb-6'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
                        <input 
                            placeholder='Enter your username'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            type="text"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                        <input 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            placeholder='Enter your email'
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-violet-500'
                            placeholder='Enter your password' 
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <input 
                            className='button text-white mt-10 bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'
                            type="submit" 
                            value="Register Account" />
                    </div>
                </form>

                <div className='flex gap-2 mt-5 text-center m-auto align-center justify-center'>
                    <Link to="/admin/persons-overview" className="text-sm">View User(s)</Link>
                </div>
            </section>

            <section className="login-image-field h-[auto] overflow-hidden">
                <img 
                    className='max-h-[700px] w-full'
                    src={backgroundImage} 
                    alt=""
                    loading="lazy" />
            </section>

        </div>
    );
}

export default Register
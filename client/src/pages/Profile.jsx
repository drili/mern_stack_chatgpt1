import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import PageHeading from '../components/PageHeading';
import GenericForm from '../components/GenericForm';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UploadImageForm from '../components/UploadImageForm';

const Profile = () => {
    const { user, setUser } = useContext(UserContext)
    console.log(user);

    const handleEditProfileForm = (data) => {
        // console.log(data);
        const updatedUser = {
            username: data[0],
            email: data[1],
            userTitle: data[2],
            userId: user.id
        }

        axios.put("http://localhost:5000/users/profile/update", updatedUser)
            .then((res) => {
                console.log('User information updated successfully:', res.data)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                setUser(res.data.user)

                toast('User has been updated successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })
            })
            .catch((err) => {
                toast('There was an error updating your user', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#ef4444',
                        color: "#fff"
                    }
                })

                console.error('Failed to update user information:', err)
            });
    }

    const handleEditPassword = (data) => {
        console.log(data);

        if (data[0] !== data[1]) {
            toast('Passwords do not match', {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#ef4444',
                    color: "#fff"
                }
            })

            return
        }

        const updatedPassword = {
            newPassword: data[0],
            userId: user.id
        }

        axios.put("http://localhost:5000/users/profile/update-password", updatedPassword)
            .then((res) => {
                console.log('User password updated successfully:', res.data)

                toast('Password has been updated successfully', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#22c55e',
                        color: "#fff"
                    }
                })
            })
            .catch((err) => {
                toast('There was an error updating your password', {
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        background: '#ef4444',
                        color: "#fff"
                    }
                })

                console.error('Failed to update user information:', err)
            });
            
    }

    return (
        <div id='profilePage'>
            <PageHeading 
                heading="Profile Page"
                subHeading={`Welcome to the profile page`}
                suffix="A quick overview of your data"
            />

            <section className='grid grid-cols-2 gap-10 mb-10'>
                <span>
                    <div className='shadow-md p-10 rounded-lg mb-10'>
                        <span>
                            <h2 className='font-bold mb-5'>Update your user info</h2>
                            <hr className='mb-5'/>
                        </span>


                        <GenericForm
                            fieldCount={3}
                            inputTypes={['text', 'email', 'text']}
                            fieldNames={[`Username`, `Email`, 'User Title']}
                            fieldValues={[`${user.username}`,`${user.email}`,  `${user.user_title}`, '', '']}
                            required={[true, true, true, true]}
                            formClass="my-form"
                            inputClass="my-input"
                            buttonClass="my-button"
                            onSubmit={(data) => handleEditProfileForm(data)}
                        />
                    </div>

                    <div className='shadow-md p-10 rounded-lg'>
                        <span>
                            <h2 className='font-bold mb-5'>Update your user password</h2>
                            <hr className='mb-5'/>
                        </span>

                        <GenericForm
                            fieldCount={2}
                            inputTypes={['password', 'password']}
                            fieldNames={[`New Password`, `Confirm Password`]}
                            fieldValues={['', '']}
                            required={[true, true]}
                            formClass="my-form"
                            inputClass="my-input"
                            buttonClass="my-button"
                            onSubmit={(data) => handleEditPassword(data)}
                        />
                    </div>
                </span>

                <span>
                    <div className='shadow-md p-10 rounded-lg bg-slate-50 mb-10'>
                        <span className='flex flex-col m-auto text-center'>
                            <span>
                                <UploadImageForm></UploadImageForm>
                            </span>
                        </span>

                        <div>
                            
                        </div>
                    </div>

                    <div className='shadow-md p-10 rounded-lg bg-slate-50'>
                        <span>
                            <h2 className='font-bold mb-5'>Your user info and data</h2>
                            <hr className='mb-5'/>
                        </span>

                        <div>
                            
                        </div>
                    </div>
                </span>
            </section>

            <Toaster />
        </div>
    )
}

export default Profile
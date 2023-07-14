import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import PageHeading from '../components/PageHeading';
import GenericForm from '../components/GenericForm';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useContext(UserContext)

    const handleEditProfileForm = (data) => {
        console.log(data);
        console.log(data[0]);

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
            })
            .catch((err) => {
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

            <section className='grid grid-cols-2'>
                <div className='shadow-md p-10 rounded-lg'>
                    <span>
                        <h2 className='font-bold mb-5'>Update your user info</h2>
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
            </section>
        </div>
    )
}

export default Profile
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import userImage from "../assets/profile-pics/default-image.jpg"

const UploadImageForm = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (!user.profile_image) {
            setProfileImage(userImage)
            setImageSrc("")

        } else {
            setProfileImage(user.profile_image)
            setImageSrc("http://localhost:5000/uploads/")
        }
    }, [user.profile_image])

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        if(!selectedImage) {
            return
        }

        const formData = new FormData()
        formData.append("profileImage", selectedImage)
        formData.append("userId", user.id)

        try {
            const response = await axios.put("http://localhost:5000/users/profile/upload-image", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            localStorage.setItem("user", JSON.stringify(response.data.user))
            setUser(response.data.user)
            console.log(user);

            console.log('Image uploaded successfully', response.data);
        } catch (error) {
            console.error('Failed to upload image', error);
        }
    }

    return (
        <div>
            <span className='mb-5'>
                <img 
                    src={`${imageSrc}${profileImage}`}
                    className="w-[100px] h-[100px] object-cover rounded-full text-center m-auto mb-5"
                />
                <h3 className='font-bold mb-5'><b>{user.username} - </b>{user.email}</h3>
                <span className='bg-indigo-100 text-indigo-800 rounded-md py-1 px-2 text-xs font-bold'>{user.user_title}</span>
                <hr className='mt-10'/>
            </span>

            <form onSubmit={handleFormSubmit} className='mt-10'>
                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Update Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <input
                    required 
                    className='my-button button text-white mt-10 bg-indigo-500 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-violet-800'
                    type="submit"
                    value="Upload New Image"
                    />
            </form>
        </div>
    )
}

export default UploadImageForm
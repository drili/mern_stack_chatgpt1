import React, { useContext, useState } from 'react'

import PageHeading from '../components/PageHeading'
import NotificationsFilter from '../components/notifications/NotificationsFilter'
import userImageDefault from "../assets/profile-pics/default-image.jpg"
import { useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import TaskModal from '../components/task/TaskModal'

const formatDate = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);

    return date.toLocaleTimeString('en-US', options).replace(',', ' •');
};

const Notifications = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [notificationsArray, setNotificationsArray] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedTaskId, setSelectedTaskId] = useState(null)

    const { user, setHasUnreadNotifications } = useContext(UserContext)

    // *** Server requests
    const handleUpdateNotificationIsRead = async (notificationId) => {
        try {
            const response = await axios.put("http://localhost:5000/notifications/update-user-notification-read", {
                notificationId
            })

            if (response.status == 200) {
                fetchUnreadNotifications(user.id).then(response => {
                    const hasUnread = response.data.some(notification => !notification.notificationIsRead);
                    console.log({hasUnread});
                    setHasUnreadNotifications(hasUnread);
                })
            }

        } catch (error) {
            console.error("Error updating notifications", error)
            
        }
    }

    const fetchNotifications = async (userId) => {
        try {
            const response = await axios.post("http://localhost:5000/notifications/fetch-user-notifications", {
                userId: userId
            })

            setNotificationsArray(response.data)
        } catch (error) {
            console.error("Error fetching notifications", error)
        }
    }

    const fetchUnreadNotifications = async (userId) => {
        try {
            const response = await axios.post("http://localhost:5000/notifications/fetch-unread-notifications", {
                userId: userId
            })

            return response
        } catch (error) {
            console.error("Error fetching notifications", error)
        }
    }

    // *** 
    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
     }

    const handleTaskModal = (taskId, notificationId) => {
        setShowModal(true)
        setSelectedTaskId(taskId)

        setNotificationsArray(prevNotifications =>
            prevNotifications.map(notification => {
                if (notification._id === notificationId) {
                    if (!notification.notificationIsRead) {
                        handleUpdateNotificationIsRead(notificationId);
                        return { ...notification, notificationIsRead: true };
                    }
                    return notification;
                }
                return notification;
            })
        );
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        fetchNotifications(user.id)
    }, [user])

    return (
        <div id='NotificationsPage'>
            <PageHeading
                heading="Your Notifications"
                subHeading={`Navigate through your different notifications`}
                suffix=""
            />

            <NotificationsFilter
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />

            <div className='grid grid-cols-3 gap-10'>
                <section id='NotificationsSections' className='border rounded-md flex flex-col col-span-2'>
                    {notificationsArray && (
                        <>
                            {notificationsArray.map((notification) => (
                                <div 
                                    onClick={() => handleTaskModal(notification.taskId._id, notification._id)}
                                    key={notification._id} 
                                    className={`relative w-full flex gap-5 p-5 hover:cursor-pointer hover:bg-slate-50 
                                        ${notification.notificationIsRead ? "bg-slate-0" : "bg-slate-200"}`}>
                                    
                                    {!notification.notificationIsRead ? (
                                        <span className='block w-[10px] h-[10px] bg-blue-500 rounded-full absolute left-[15px] top-[40px]'></span>
                                    ) : null}
                                    
                                    <span className='flex ml-5'>
                                        <img
                                            src={`http://localhost:5000/uploads/${notification.mentionedBy.profileImage}`}
                                            className="min-w-[50px] h-[50px] object-cover rounded-md"
                                        />
                                    </span>

                                    <span className='flex flex-1 flex-col overflow-hidden mr-5'>
                                        <h3 className='font-bold'>{notification.mentionedBy.username}</h3>
                                        <span className='flex justify-between'>
                                            <p className='text-sm text-slate-500 mb-2'>Mentioned you in task "{notification.taskId.taskName}" [{notification.taskCustomer.customerName}]</p>
                                            <p className='text-sm font-bold text-slate-900 mb-2'>{formatDate(notification.createdAt)}</p>
                                        </span>
                                        <p className='trunateCustom'>{stripHtml(notification.notificationMessage)}</p>
                                    </span>
                                </div>
                            ))}
                        </>
                    )}

                </section>

                <section id='NotificationsTasks' className='col-span-1'>
                    <h2 className='font-bold mb-5'>Tasks you have recently been added to</h2>
                </section>
            </div>

            <TaskModal
                taskID={selectedTaskId}
                showModalState={showModal}
                onCloseModal={onCloseModal}
                // fetchTasks={fetchTasks}
                // sprintOverviewFetch={sprintOverviewFetch}
                // updateFunc={sprintOverviewFetch}
            />
        </div>
    )
}

export default Notifications
const express = require("express")
const router = express.Router()

const NotificationChatTask = require("../models/NotificationChatTask")
const User = require("../models/User")
const Customer = require("../models/Customer")
const Task = require("../models/Task")

const notificationType = "user_tagging_task"

router.route("/fetch-user-notifications").post(async (req, res) => {
    const { userId } = req.body

    try {
        const notifications = await NotificationChatTask.find({ userId: userId })
            .populate({
                path: "mentionedBy",
                model: User,
                select: "username email profileImage",
            })
            .populate({
                path: "taskCustomer",
                model: Customer,
                select: "customerName customerColor"
            })
            .populate({
                path: "taskId",
                model: Task,
                select: "taskName",
            })
            .sort({ _id: -1 })

            res.status(200).json(notifications)
    } catch (error) {
        console.error("Error fetching user notifications", error);
        res.status(500).send("Error fetching notifications")
    }
})

router.route("/create-notification").post(async (req, res) => {
    const {
        mentionedUsers,
        taskId,
        taskCustomer,
        mentionedBy,
        htmlContent } = req.body

    const notificationLinkModified = `/task?taskId=${taskId}`
        
    try {
        mentionedUsers.forEach(async (user) => {
            const newNotification = new NotificationChatTask({
                userId: user.id,
                notificationType: notificationType,
                notificationLink: notificationLinkModified,
                notificationMessage: htmlContent,
                taskId: taskId,
                taskCustomer: taskCustomer,
                mentionedBy: mentionedBy
            })

            await newNotification.save()
        })

        res.status(200).send("Notifications created successfully")
    } catch (error) {
        console.error("Error creating notifications", error)
        res.status(500).send("Error creating notifcations")
    }
})

module.exports = router
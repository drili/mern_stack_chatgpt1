const express = require("express")
const router = express.Router()
const NotificationChatTask = require("../models/NotificationChatTask")

const notificationType = "user_tagging"

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
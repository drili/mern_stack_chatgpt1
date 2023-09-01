const express = require("express")
const router = express.Router()
const TimeRegistration = require("../models/TimeRegistration")

router.route("/register-time").post(async (req,res) => {
    const { userId, taskId, timeRegistered, description, sprintId } = req.body
    
    try {
        const timeRegistration = await TimeRegistration.create({
            userId,
            taskId,
            timeRegistered,
            description,
            sprintId
        })
    
        return res.status(201).json(timeRegistration)
    } catch (error) {
        console.error('Failed to register time', error);
        return res.status(500).json({ error: 'Failed to register time' });
    }
})

router.route("/time-registered/:taskId").get(async (req,res) => {
    const { taskId } = req.params
    
    try {
        const timeRegistrations = await TimeRegistration.find({
            taskId
        })

        return res.status(200).json(timeRegistrations)
    } catch (error) {
        console.error("There was an error fetching time registration", error)
        return res.status(500).json({ error: "Failed to fetch time registrations" })
    }
})

router.route("/time-registered-user/:sprintId/:userId").get(async (req, res) => {
    const { sprintId } = req.params
    const { userId } = req.params

    if(sprintId && userId) {
        try {
            const timeRegistered = await TimeRegistration.find({
                sprintId,
                userId
            })
    
            return res.status(200).json(timeRegistered)
        } catch (error) {
            console.error("There was an error fetching time registration by user & sprint", error)
            return res.status(500).json({ error: "Failed to fetch time registrations user & sprint" })
        }
    }
})

module.exports = router
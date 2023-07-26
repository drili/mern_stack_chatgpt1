const express = require("express")
const router = express.Router()
const TimeRegistration = require("../models/TimeRegistration")

router.route("/register-time").post(async (req,res) => {
    const { userId, taskId, timeRegistered, description } = req.body

    try {
        const timeRegistration = await TimeRegistration.create({
            userId,
            taskId,
            timeRegistered,
            description
        })
    
        return res.status(201).json(timeRegistration)
    } catch (error) {
        console.error('Failed to register time', error);
        return res.status(500).json({ error: 'Failed to register time' });
    }
})

module.exports = router
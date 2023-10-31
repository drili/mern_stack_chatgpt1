const express = require("express")
const router = express.Router()
const TimeRegistration = require("../models/TimeRegistration")

router.route("/time-registration-delete/:eventId").delete(async (req, res) => {
    const { eventId } = req.params

    try {
        const timeRegistrationDelete = await TimeRegistration.findByIdAndDelete(eventId)

        return res.status(200).json(timeRegistrationDelete)
    } catch (error) {
        console.error('Failed delete registered', error);
        return res.status(500).json({ error: 'Failed delete registered' });
    }
})

router.route("/time-registration-update").post(async (req, res) => {
    const { eventId, editedTime } = req.body

    try {
        const timeRegistration = await TimeRegistration.findByIdAndUpdate(eventId, { $set: { timeRegistered: editedTime } })

        return res.status(200).json(timeRegistration)
    } catch (error) {
        console.error('Failed update registered', error);
        return res.status(500).json({ error: 'Failed update registered' });
    }
})

router.route("/time-registrations-by-date/:date/:userId").get(async (req, res) => {
    const { date, userId } = req.params

    try {
        const timeRegistrations = await TimeRegistration.find({
            currentTime: date,
            userId: userId
        }).populate("taskId")

        return res.status(200).json(timeRegistrations)
    } catch (error) {
        console.error('Failed fetch registered times by date', error);
        return res.status(500).json({ error: 'Failed fetch registered times by date' });
    }
})

router.route("/time-registered-by-user").post(async (req, res) => {
    const { userId } = req.body
    
    try {
        const timeRegistrations = await TimeRegistration.find({ userId });

        const aggregatedData = timeRegistrations.reduce((acc, item) => {
            const key = item.currentTime
            if (!acc[key]) {
                acc[key] = {
                    currentTime: item.currentTime,
                    totalRegisteredTime: 0,
                }
            }
            acc[key].totalRegisteredTime += item.timeRegistered;

            return acc;
        }, {})

        const result = Object.values(aggregatedData);

        return res.status(200).json(result)
    } catch (error) {
        console.error('Failed fetch registered times', error);
        return res.status(500).json({ error: 'Failed fetch registered times' });
    }
})

router.route("/register-time").post(async (req,res) => {
    const { userId, taskId, timeRegistered, description, sprintId, currentTime } = req.body
    
    function formatDateForDisplay(inputDate) {
        const dateParts = inputDate.split('-')
        if (dateParts.length === 3) {
            return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        } else {
            return inputDate
        }
    }

    const formattedDate = formatDateForDisplay(currentTime)

    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const year = date.getFullYear()
    // currentTimeStr = `${day}-${month}-${year}`
    
    try {
        const timeRegistration = await TimeRegistration.create({
            userId,
            taskId,
            timeRegistered,
            description,
            sprintId,
            currentTime: formattedDate
        })
        
        return res.status(201).json(timeRegistration)
    } catch (error) {
        console.error('Failed to register time', error)
        return res.status(500).json({ error: 'Failed to register time' })
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
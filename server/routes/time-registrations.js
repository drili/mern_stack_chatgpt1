const express = require("express")
const router = express.Router()
const TimeRegistration = require("../models/TimeRegistration")
const User = require("../models/User")
const Sprints = require("../models/Sprints")

const formatDateToMonthYear = require("../functions/formatDateToMonthYear")

router.route("/fetch-users-time-regs-by-sprint/:sprintId").get(async (req, res) => {
    try {
        const { sprintId } = req.params
        const activeUsers = await User.find({ isActivated: true })
        const activeUsersData = []

        if (sprintId && activeUsers) {
            for (const user of activeUsers) {
                const timeRegistrations = await TimeRegistration.find({ 
                    userId: user._id,
                    sprintId: sprintId
                })
    
                let totalTime = 0
                let clientTime = 0
                let internTime = 0
                let restTime = 0
    
                for (const registration of timeRegistrations) {
                    totalTime += registration.timeRegistered
    
                    if (registration.registrationType === "client") {
                        clientTime += registration.timeRegistered
                    } else if (registration.registrationType === "intern") {
                        internTime += registration.timeRegistered
                    } else {
                        restTime += registration.timeRegistered
                    }
                }
    
                const userData = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    totalTime,
                    clientTime,
                    internTime,
                    restTime,
                    profileImage: user.profileImage
                }
    
                activeUsersData.push(userData)
            }
        }
        
        res.status(200).json(activeUsersData)
    } catch (error) {
        console.error('Failed to fetch data:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

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
    const { userId, taskId, timeRegistered, description, sprintId, currentTime, registrationType, customerId, verticalId } = req.body
    
    function formatDateForDisplay(inputDate) {
        const dateParts = inputDate.split('-')
        if (dateParts.length === 3) {
            return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        } else {
            return inputDate
        }
    }

    let registrationTypeValue
    if (customerId) {
        if (customerId === "6502b87bd426f295d2d250b1") {
            registrationTypeValue = "intern"
        } else {
            registrationTypeValue = "client"
        }
    } else {
        registrationTypeValue = registrationType
    }

    const formattedDate = formatDateForDisplay(currentTime)

    const date = new Date()
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') 
    const year = date.getFullYear()
    // currentTimeStr = `${day}-${month}-${year}`
    
    const formattedMonthYear = formatDateToMonthYear(formattedDate)

    // *** Find sprintId
    const sprint = await Sprints.findOne({
        sprintName: formattedMonthYear
    })

    if (!sprint) {
        return res.status(500).json({ error: 'Failed to find sprint' })
    }

    const newSprintId = sprint._id

    try {
        const timeRegistration = await TimeRegistration.create({
            userId,
            taskId,
            timeRegistered,
            description,
            sprintId: newSprintId,
            currentTime: formattedDate,
            registrationType: registrationTypeValue,
            verticalId
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
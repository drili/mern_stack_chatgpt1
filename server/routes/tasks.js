const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

router.route("/create").post(async (req, res) => {
    const {
        taskName,
        taskTimeLow,
        taskTimeHigh,
        taskDescription,
        taskCustomer,
        taskLabel,
        taskVertical,
        taskPersons,
        taskSprints,
        createdBy
    } = req.body

    try {
        const task = new Task({
            taskName,
            taskTimeLow,
            taskTimeHigh,
            taskDescription,
            taskCustomer,
            taskLabel,
            taskVertical,
            taskPersons,
            taskSprints,
            createdBy
        })

        const savedTask = await task.save()

        res.json(savedTask)
    } catch (error) {
        console.error('Failed to create task', error)
        res.status(500).json({ error: 'Failed to create task' })
    }
})

module.exports = router
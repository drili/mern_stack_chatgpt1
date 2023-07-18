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

router.route("/fetch-by-user/:userId").get(async (req, res) => {
    const { userId } = req.params

    try {
        const tasks = await Task.find({ createdBy: userId }).sort({ _id: -1 })
        res.json(tasks)
    } catch (error) {
        console.error("Failed to fetch tasks by user", error)
    res.status(500).json({ error: "Failed to fetch tasks by user" })
    }
})

module.exports = router
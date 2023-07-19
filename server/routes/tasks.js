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
        taskSprints.forEach(async (sprintId) => {
            const task = new Task({
                taskName,
                taskTimeLow,
                taskTimeHigh,
                taskDescription,
                taskCustomer,
                taskLabel,
                taskVertical,
                taskPersons,
                taskSprints: [sprintId],
                createdBy
            })

            await task.save()
        });

        res.json({ message: "Tasks created successfully" });
    } catch (error) {
        console.error("Failed to create tasks", error);
        res.status(500).json({ error: "Failed to create tasks" });
    }
})

router.route("/fetch-by-user/:userId").get(async (req, res) => {
    const { userId } = req.params

    try {
        const tasks = await Task.find({ createdBy: userId })
            .populate("createdBy", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate("taskPersons", ["username", "email", "profileImage", "userRole", "userTitle"])
            .sort({ _id: -1 })
            
        res.json(tasks)
    } catch (error) {
        console.error("Failed to fetch tasks by user", error)
        res.status(500).json({ error: "Failed to fetch tasks by user" })
    }
})

router.route("/fetch-by-id/:taskId").get(async (req, res) => {
    const { taskId } = req.params

    try {
        const task = await Task.find({ _id: taskId })
            .populate("taskPersons", ["_id", "username", "email", "profileImage", "userRole", "userTitle"])
            .populate("taskSprints", ["_id", "sprintName", "sprintMonth", "sprintYear"])
            .populate("taskCustomer", ["_id", "customerName", "customerColor"])

        res.json(task)
    } catch (error) {
        console.error("Failed to fetch task by id", error)
        res.status(500).json({ error: "Failed to fetch task by id" })
    }
})

router.route("/update/:taskId").put(async (req, res) => {
    const { taskId } = req.params
    const { taskName, taskTimeLow, taskTimeHigh, taskDescription } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                taskName,
                taskTimeLow,
                taskTimeHigh,
                taskDescription,
            },
            { new: true }
        )

        res.json(updatedTask)
    } catch (error) {
        console.error("Failed to update task", error);
        res.status(500).json({ error: "Failed to update task" });
    }
})

router.route("/update-sprint/:taskId").put(async (req,res) => {
    const { taskId } = req.params
    const { taskSprintId } = req.body

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { taskSprints: taskSprintId },
            { new: true }
        )

        res.json(updatedTask)
    } catch (error) {
        console.error("Failed to update task sprint", error);
        res.status(500).json({ error: "Failed to update task sprint" });
    }
})

module.exports = router
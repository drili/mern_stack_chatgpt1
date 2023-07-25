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
        const tasks = await Task.find({ 
            createdBy: userId,
            isArchived: { $ne: true }
        })
            .populate("createdBy", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate("taskPersons", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate("taskCustomer", ["customerName", "customerColor"])
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

router.route("/assign-user/:taskId").put(async (req, res) => {
    const { taskId } = req.params
    const { assignedUserId } = req.body

    try {
        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.taskPersons.push(assignedUserId)
        const updatedTask = await task.save()

        res.json(updatedTask)
    } catch (error) {
        console.error('Failed to assign user to task', error);
        res.status(500).json({ error: 'Failed to assign user to task' })
    }
})

router.route("/remove-user/:taskId/:taskPersonId").put(async (req, res) => {
    const { taskId, taskPersonId } = req.params
    console.log(taskId, taskPersonId)

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $pull: { taskPersons: taskPersonId } },
            { new: true }
        )

        res.json(updatedTask)
    } catch (error) {
        console.error("Failed to remove user from task", error)
        res.status(500).json({ error: "Failed to remove user from task" })
    }
})

router.route("/archive-task/:taskId").put(async (req, res) => {
    const { taskId } = req.params

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            { isArchived: true },
            { new: true }
        )

        res.json(task)
    } catch (error) {
        console.error("Failed to archive task", error);
        res.status(500).json({ error: "Failed to archive task" });
    }
})

router.route("/update-taskworkflow/:taskId").put(async (req, res) => {
    const { taskId } = req.params
    const { workflowStatus } = req.body

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { workflowStatus: workflowStatus },
            { new: true }
        )

        res.json(updatedTask)
    } catch (error) {
        console.error("Failed to update task workflowStatus", error)
        res.status(500).json({ error: "Failed to updated task workflowStatus" })
    }
})

module.exports = router
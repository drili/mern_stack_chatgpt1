const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const Sprint = require("../models/Sprints")
const TimeRegistration = require("../models/TimeRegistration")
const mongoose = require("mongoose")

router.route("/fetch-deadlines").get(async (req, res) => {
    const { sprintId, userId } = req.query

    const objectIdSprintId = new mongoose.Types.ObjectId(sprintId)
    const objectIdUserId = new mongoose.Types.ObjectId(userId)

    const todayDate = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(todayDate.getDate() + 7);

    try {
        const deadlineTasks = await Task.find({
            taskSprints: objectIdSprintId,
            'taskPersons.user': objectIdUserId,
            isArchived: false
        })

        const arrayTasks = [];

        Object.values(deadlineTasks).flat().forEach(task => {
            if (task.taskType === "quickTask") {
                const taskDeadline = new Date(task.taskDeadline);
                if (task.workflowStatus !== 3 && taskDeadline >= todayDate && taskDeadline <= sevenDaysFromNow) {
                    arrayTasks.push(task);
                }
            }
        });

        res.json(arrayTasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.route("/update-percentage").post(async (req, res) => {
    const { taskId, percentageValues } = req.body

    // for (const [key, value] of Object.entries(percentageValues)) {
    //     console.log(`${key}: ${value}`)
    // }

    try {
        const task = await Task.findById(taskId)

        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }

        task.taskPersons.forEach((person, index) => {
            const userId = person.user._id.toString();

            if (percentageValues[userId]) {
                person.percentage = parseInt(percentageValues[userId], 10);
            }
        })

        await task.save()
        return res.status(200).json({ message: 'Task percentage updated successfully' });
    } catch (error) {
        console.error('Error updating task percentage:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

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
        createdBy,
        taskDeadline,
        estimatedTime,
        taskType,
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
                createdBy,
                taskDeadline,
                estimatedTime,
                taskType,
            })

            const taskSaved = await task.save()
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
            // .populate("taskPersons", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate({
                path: 'taskPersons.user',
                select: ['_id', 'username', 'email', 'profileImage', 'userRole', 'userTitle']
            })
            .populate("taskCustomer", ["customerName", "customerColor"])
            .populate("taskSprints", ["_id", "sprintName", "sprintMonth", "sprintYear"])
            .sort({ _id: -1 })

        res.json(tasks)
    } catch (error) {
        console.error("Failed to fetch tasks by user", error)
        res.status(500).json({ error: "Failed to fetch tasks by user" })
    }
})

router.route("/fetch-by-customer-sprint/:customerId").get(async (req, res) => {
    try {
        const { customerId } = req.params
        const { month, year, time_reg } = req.query

        if (!month || !year) {
            return res.status(400).json({ error: "Month and year are required." });
        }

        const targetTaskSprint = await Sprint.findOne({
            sprintMonth: month,
            sprintYear: year
        })

        const tasks = await Task.find({
            taskCustomer: customerId,
            isArchived: { $ne: true },
            taskSprints: targetTaskSprint._id
        })
            .populate("createdBy", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate({
                path: "taskPersons.user",
                select: ["_id", "username", "email", "profileImage", "userRole", "userTitle"]
            })
            .populate("taskCustomer", ["customerName", "customerColor"])
            .populate("taskSprints", ["_id", "sprintName", "sprintMonth", "sprintYear"])
            .sort({ _id: -1 })

        if (time_reg) {
            const timeRegistrations = await TimeRegistration.find({
                taskId: { $in: tasks.map(task => task._id) }
            })
                .select("_id userId taskId timeRegistered description createdAt updatedAt")

            const tasksWithTimeRegistrations = tasks.map(task => {
                const taskTimeRegistrations = timeRegistrations.filter(reg => reg.taskId.equals(task._id));
                return {
                    ...task.toObject(),  // *** Convert the Mongoose document to a plain object
                    timeRegistrations: taskTimeRegistrations,
                }
            })

            res.json(tasksWithTimeRegistrations)
        } else {
            res.json(tasks)
        }
    } catch (error) {
        console.error("Failed to fetch tasks by user & sprint", error)
        res.status(500).json({ error: "Failed to fetch tasks by user & sprint" })
    }
})

router.route("/fetch-by-user-sprint/:userId").get(async (req, res) => {
    try {
        const { userId } = req.params
        const { month, year, time_reg } = req.query

        if (!month || !year) {
            return res.status(400).json({ error: "Month and year are required." });
        }

        const targetTaskSprint = await Sprint.findOne({
            sprintMonth: month,
            sprintYear: year
        })

        const tasks = await Task.find({
            "taskPersons.user": userId,
            isArchived: { $ne: true },
            taskSprints: targetTaskSprint._id
        })
            .populate("createdBy", ["username", "email", "profileImage", "userRole", "userTitle"])
            .populate({
                path: "taskPersons.user",
                select: ["_id", "username", "email", "profileImage", "userRole", "userTitle"]
            })
            .populate("taskCustomer", ["customerName", "customerColor"])
            .populate("taskSprints", ["_id", "sprintName", "sprintMonth", "sprintYear"])
            .sort({ _id: -1 })

        if (time_reg) {
            const timeRegistrations = await TimeRegistration.find({
                taskId: { $in: tasks.map(task => task._id) }
            })
                .select("_id userId taskId timeRegistered description createdAt updatedAt")

            const tasksWithTimeRegistrations = tasks.map(task => {
                const taskTimeRegistrations = timeRegistrations.filter(reg => reg.taskId.equals(task._id));
                return {
                    ...task.toObject(),  // *** Convert the Mongoose document to a plain object
                    timeRegistrations: taskTimeRegistrations,
                }
            })

            res.json(tasksWithTimeRegistrations)
        } else {
            res.json(tasks)
        }
    } catch (error) {
        console.error("Failed to fetch tasks by user & sprint", error)
        res.status(500).json({ error: "Failed to fetch tasks by user & sprint" })
    }
})

router.route("/fetch-by-id/:taskId").get(async (req, res) => {
    const { taskId } = req.params

    try {
        const task = await Task.find({ _id: taskId })
            // .populate("taskPersons", ["_id", "username", "email", "profileImage", "userRole", "userTitle"])
            .populate({
                path: 'taskPersons.user',
                select: ['_id', 'username', 'email', 'profileImage', 'userRole', 'userTitle']
            })
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
    const { taskName, taskTimeLow, taskTimeHigh, taskDescription, taskDeadline, estimatedTime } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                taskName,
                taskTimeLow,
                taskTimeHigh,
                taskDescription,
                taskDeadline,
                estimatedTime,
            },
            { new: true }
        )

        res.json(updatedTask)
    } catch (error) {
        console.error("Failed to update task", error);
        res.status(500).json({ error: "Failed to update task" });
    }
})

router.route("/update-sprint/:taskId").put(async (req, res) => {
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
            return res.status(404).json({ error: 'Task not found' })
        }

        const numbersOfUsers = task.taskPersons.length + 1

        const newTaskPerson = {
            user: assignedUserId,
            percentage: 100 / numbersOfUsers
        }

        task.taskPersons.forEach((person) => {
            person.percentage = 100 / numbersOfUsers;
        })

        task.taskPersons.push(newTaskPerson)
        const updatedTask = await task.save()

        res.json(updatedTask)
    } catch (error) {
        console.error('Failed to assign user to task', error);
        res.status(500).json({ error: 'Failed to assign user to task' })
    }
})

router.route("/remove-user/:taskId/:taskPersonId").put(async (req, res) => {
    const { taskId, taskPersonId } = req.params

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const numberOfUsers = task.taskPersons.length - 1
        task.taskPersons = task.taskPersons.filter(person => person.user !== taskPersonId)
        task.taskPersons.forEach(person => {
            person.percentage = 100 / numberOfUsers;
        })

        const savedTask = await task.save();

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $pull: {
                    taskPersons: {
                        user: taskPersonId,
                    }
                }
            },
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
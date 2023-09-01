const express = require("express")
const router = express.Router()
const Sprints = require("../models/Sprints")

router.route("/fetch").get(async (req, res) => {
    try {
        const sprints = await Sprints.find().sort({ _id: -1 })
        res.json(sprints)
    } catch (error) {
        console.error('Failed to fetch sprints', error)
        res.status(500).json({ error: "Failed to fetch sprints" })
    }
})

router.route("/fetch-sprint-by-id/:sprintId").get(async (req, res) => {
    const { sprintId } = req.params

    try {
        const sprint = await Sprints.findById({ sprintId })
        res.json(sprint)
    } catch (error) {
        console.error('Failed to fetch sprint', error)
        res.status(500).json({ error: "Failed to fetch sprint" })
    }
})

router.route("/fetch-sprint-by-month-year/:sprintMonth/:sprintYear").get(async (req, res) => {
    const { sprintMonth } = req.params
    const { sprintYear } = req.params

    try {
        const sprint = await Sprints.find({
            sprintMonth,
            sprintYear
        })

        return res.status(200).json(sprint)
    } catch (error) {
        console.error("There was an error fetching sprint year & month", error)
        return res.status(500).json({ error: "Failed to fetch sprint by year & month" })
    }
})

module.exports = router
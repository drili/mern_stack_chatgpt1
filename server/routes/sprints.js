const express = require("express")
const router = express.Router()
const Sprints = require("../models/Sprints")
const SprintYear = require("../models/SprintYear")

router.route("/fetch-sprint-years").get(async (req, res) => {
    try {
        const sprintYears = await SprintYear.find().sort({ _id: -1 })
        res.json(sprintYears)
    } catch (error) {
        console.error('Failed to fetch sprintYears', error)
        res.status(500).json({ error: "Failed to fetch sprintYears" })
    }
})

router.route("/fetch").get(async (req, res) => {
    let { activeYear } = req.query

    if (!activeYear) {
        activeYear = new Date().getFullYear()
    }

    try {
        const sprints = await Sprints.find({ sprintYear: activeYear }).sort({ _id: -1 })
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

    if (!sprintMonth || !sprintYear) {
        return
    }

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
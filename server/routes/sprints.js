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

module.exports = router
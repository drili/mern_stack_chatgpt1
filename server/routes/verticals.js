const express = require("express")
const router = express.Router()
const Vertical = require("../models/Vertical")

router.route("/fetch-Verticals").get(async (req, res) => {
    try {
        const verticals = await Vertical.find().sort({ _id: -1 })
        res.json(verticals)
    } catch (error) {
        console.error('Failed to fetch verticals', error)
        res.status(500).json({ error: "Failed to fetch verticals" })
    }
})

module.exports = router
const express = require("express")
const router = express.Router()
const Label = require("../models/Label")

router.route("/fetch-labels").get(async (req, res) => {
    try {
        const labels = await Label.find().sort({ _id: -1 })
        res.json(labels)
    } catch (error) {
        console.error('Failed to fetch labels', error)
        res.status(500).json({ error: "Failed to fetch labels" })
    }
})

module.exports = router
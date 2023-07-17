const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')

// *** Run in Postman to activate (PUT: http://localhost:5000/updates/update-customer-schema)

router.route("/update-customer-schema").put(async (req, res) => {
    try {
        await Customer.updateMany({}, { $set: { isArchived: false } })
        res.json({ message: "Customer schema updated successfully" })
    } catch (error) {
        console.error("Failed to update customer schema", error);
        res.status(500).json({ error: "Failed to update customer schema" });
    }
})

module.exports = router
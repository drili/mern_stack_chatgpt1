const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')

router.route("/create").post(async (req, res) => {
    const { customerName, customerColor } = req.body

    console.log(req.body)

    try {
        const customer = new Customer({
            customerName,
            customerColor
        })

        const savedCustomer = await customer.save()

        res.json(savedCustomer)
    } catch (error) {
        console.error('Failed to create customer', error);
        res.status(500).json({ error: 'Failed to create customer' })
    }
})

module.exports = router
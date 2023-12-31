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

router.route("/fetch").get(async (req, res) => {
    try {
        const customers = await Customer.find().sort({ _id: -1 })
        res.json(customers)
    } catch (error) {
        console.error('Failed to fetch customers', error)
        res.status(500).json({ error: "Failed to fetch customers" })
    }
})

router.route("/delete/:customerId").delete(async (req, res) => {
    const { customerId } = req.params

    try {
        await Customer.findByIdAndDelete(customerId)
        res.json({ message: "Customer deleted successfully" })
    } catch (error) {
        console.error("Failed to delete customer", error)
        res.status(500).json({ error: "Failed to delete customer" })
    }
})

router.route("/archive/:customerId").put(async (req,res) => {
    const { customerId } = req.params

    try {
        await Customer.findByIdAndUpdate(customerId, { $set : { isArchived: true } })
        res.json({ message: "Customer archived & updated successfully" })
    } catch (error) {
        console.error("Failed to archive customer", error);
        res.status(500).json({ error: "Failed to archive customer" });
    }
})

router.route("/unarchive/:customerId").put(async (req,res) => {
    const { customerId } = req.params

    try {
        await Customer.findByIdAndUpdate(customerId, { $set : { isArchived: false } })
        res.json({ message: "Customer archived & updated successfully" })
    } catch (error) {
        console.error("Failed to archive customer", error);
        res.status(500).json({ error: "Failed to archive customer" });
    }
})

module.exports = router
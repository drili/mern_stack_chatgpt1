const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerColor: {
        type: String,
        required: true
    },
    isArchived: {
        type: Boolean,
        default: false,
    }
    // * Optionally, use the default MongoDB _id field instead of customerID
    // customerID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: mongoose.Types.ObjectId
    // }
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer
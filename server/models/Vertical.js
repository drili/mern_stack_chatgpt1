const mongoose = require("mongoose")

const verticalSchema = new mongoose.Schema({
    verticalName: {
        type: String,
        required: true
    },
})

const Vertical = mongoose.model("Vertical", verticalSchema)

module.exports = Vertical
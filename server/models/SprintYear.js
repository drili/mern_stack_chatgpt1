const mongoose = require("mongoose")

const sprintYearSchema = mongoose.Schema({
    sprintYear: {
        type: Number,
        required: true,
        unique: true,
    }
})

const SprintYear = mongoose.model("SprintYear", sprintYearSchema)

module.exports = SprintYear
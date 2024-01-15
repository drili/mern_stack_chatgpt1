const mongoose = require("mongoose")

const sprintSchema = mongoose.Schema({
    sprintName: {
        type: String,
        required: true,
        unique: true,
    },
    sprintMonth: {
        type: String,
        required: true
    },
    sprintYear: {
        type: Number,
        required: true
    }
})

const Sprints = mongoose.model("Sprints", sprintSchema)

module.exports = Sprints

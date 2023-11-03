const mongoose = require("mongoose")

// TODO: Add timeRegistrationType
const timeRegistrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        // required: true
    },
    sprintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprints",
        required: true
    },
    timeRegistered: {
        type: Number,
        required: true
    },
    description: {
        type: Number,
        required: false
    },
    currentTime: {
        type: String
    },
    registrationType: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const TimeRegistration = mongoose.model("TimeRegistration", timeRegistrationSchema)

module.exports = TimeRegistration
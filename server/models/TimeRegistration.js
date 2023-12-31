const mongoose = require("mongoose")

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
    verticalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vertical",
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
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
        required: true
    },
    timeRegistered: {
        type: Number,
        required: true
    },
    description: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
})

const TimeRegistration = mongoose.model("TimeRegistration", timeRegistrationSchema)

module.exports = TimeRegistration
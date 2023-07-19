const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskTimeLow: {
        type: Number,
        required: true
    },
    taskTimeHigh: {
        type: Number,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    taskCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    taskLabel: {
        type: String,
        required: true,
    },
    taskVertical: {
        type: String,
        required: true,
    },
    taskPersons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    taskSprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprints',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
},
{
    timestamps: true,
}
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
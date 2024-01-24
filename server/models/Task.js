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
        required: false
    },
    taskCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    taskLabel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Label"
    },
    taskVertical: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vertical"
    },
    // taskPersons: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }],
    taskPersons:[
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            percentage: {
                type: Number,
                default: 100
            },
        },
    ],
    taskSprints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprints',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    workflowStatus: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true,
}
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Task",
    },
    htmlContent: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true,
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
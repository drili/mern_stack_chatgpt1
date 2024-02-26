const express = require("express")
const sanitizeHtml = require("sanitize-html")

const Comment = require("../models/Comments")
const User = require("../models/User")

const router = express.Router()

router.route("/delete-comment-by-id/:commentId").delete(async (req, res) => {
    const { commentId } = req.params
    
    try {
        const comment = await Comment.findByIdAndDelete(commentId)
        
        if (!comment) {
            return res.status(404).send({ error: "Comment not found" })
        }

        res.status(200).send({ message: "Comment deleted" })
    } catch (error) {
        res.status(500).send({ error: 'Internal server error `/delete-comment-by-id/:commentId`' });
    }
})

router.route("/fetch-comments-by-task").post(async (req, res) => {
    const { taskId } = req.body

    if (!taskId) {
        return res.status(400).send({ error: "Task ID is required" })
    }

    try {
        const comments = await Comment.find({ taskId: taskId })
            .sort({ createdAt: 0 })
            .populate({
                path: "createdBy",
                model: User,
                select: "username email profileImage"
            })
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send({ error: "Error fetchings comments by task ID" })
    }
})

router.route("/create-comment").post(async (req, res) => {
    const { taskId, htmlContent, createdBy } = req.body

    try {
        const sanitizedHtml = sanitizeHtml(htmlContent, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                'span': ['className'],
                'span': ['class']
            }
        });

        const comment = new Comment({
            taskId: taskId,
            htmlContent: sanitizedHtml,
            createdBy: createdBy,
        })

        const savedComment = await comment.save()
        res.json(savedComment)
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router
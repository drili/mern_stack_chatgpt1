const express = require("express")
const Comment = require("../models/Comments")
const sanitizeHtml = require("sanitize-html")

const router = express.Router()

router.route("/create-comment").post(async (req, res) => {
    const { taskId, htmlContent, createdBy } = req.body

    console.log({htmlContent});

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
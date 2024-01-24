const mongoose = require("mongoose")

const groupsSchema = mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true,
    },
    groupPersons: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }
    ]
})

const Groups = mongoose.model("Groups", groupsSchema)

module.exports = Groups
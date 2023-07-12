const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isActivated: {
            type: Boolean,
            default: false,
        },
        profileImage: {
            type: String,
            default: null,
        },
        userRole: {
            type: Number,
            default: 0,
        },
        userTitle: {
            type: String,
            default: "employee",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User
const mongoose = require("mongoose")
const User = require("../models/User")

async function updateUsers() {
    const uri = 'mongodb+srv://dbkynetic:Kynetic123123@cluster0.f80a2n8.mongodb.net/'
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    try {
        const result = await User.updateMany(
            {},
            { $set: { activeYear: 2024 } }
        )
        console.log({result})
    } catch (error) {
        console.error("Error updating users:", error)
    }
}

updateUsers()
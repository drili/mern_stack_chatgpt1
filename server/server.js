const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

// Routes
const userRouter = require("./routes/users")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRouter)

const uri = 'mongodb+srv://dbkynetic:Kynetic123123@cluster0.f80a2n8.mongodb.net/'
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("::: MongoDB database connection established successfully")
})

app.listen(5000, () => {
    console.log("::: Server is running on port 5000")
})
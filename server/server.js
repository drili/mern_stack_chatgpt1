const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

// Routes
const userRouter = require("./routes/users")
const customerRouter = require("./routes/customers")
const updateRouter = require("./routes/updates")
const taskRouter = require("./routes/tasks")
const sprintRouter = require("./routes/sprints")
const TimeRegistrationRouter = require("./routes/time-registrations")
const labelRouter = require("./routes/labels")

const app = express()

app.use('/uploads', express.static('uploads'));
app.use(cors())
app.use(express.json())
app.use("/users", userRouter)
app.use("/customers", customerRouter)
app.use("/updates", updateRouter)
app.use("/tasks", taskRouter)
app.use("/sprints", sprintRouter)
app.use("/time-registrations", TimeRegistrationRouter)
app.use("/labels", labelRouter)

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
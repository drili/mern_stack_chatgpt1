const mongoose = require("mongoose")
const SprintYear = require("../models/SprintYear")

const uri = 'mongodb+srv://dbkynetic:Kynetic123123@cluster0.f80a2n8.mongodb.net/'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const newSprintYear = new SprintYear({
    sprintYear: 2023
})

newSprintYear.save()
    .then(savedSprintYear => {
        console.log(`SprintYear saved: ${savedSprintYear}`)
    })
    .catch(error => {
        console.log(`Error saving SprintYear:`);
        console.error(error);
    })
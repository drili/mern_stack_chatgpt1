const mongoose = require("mongoose")
const Sprints = require("../models/Sprints")

const uri = 'mongodb+srv://dbkynetic:Kynetic123123@cluster0.f80a2n8.mongodb.net/'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear()

const sprintPromises = months.map(month => {
    const sprintName = `${month} ${currentYear}`
    const newSprint = new Sprints({
        sprintName,
        sprintMonth: month,
        sprintYear: currentYear,
    })

    return newSprint.save()
})

Promise.all(sprintPromises)
    .then(savedSprints => {
        console.log(`Sprints saved:`, savedSprints);
    })
    .catch(error => {
        console.error('Error saving sprints:', error);
    })
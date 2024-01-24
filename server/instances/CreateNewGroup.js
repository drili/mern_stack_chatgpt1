const mongoose = require("mongoose")
const Groups = require("../models/Groups")

const uri = 'mongodb+srv://dbkynetic:Kynetic123123@cluster0.f80a2n8.mongodb.net/'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// const users = [
//     { user: mongoose.Types.ObjectId('6529242711fecdcc308a29cb') },
//     { user: mongoose.Types.ObjectId('65292e09ee089d320077d9e6') },
// ]

const newGroup = new Groups({
    groupName: 'Developer',
    groupPersons: [
        { user: new mongoose.Types.ObjectId('6529242711fecdcc308a29cb') },
        { user: new mongoose.Types.ObjectId('65292e09ee089d320077d9e6') },
    ]
})

newGroup.save()
    .then(group => console.log("New group created", group))
    .catch(err => console.error("Error greating group:", err))
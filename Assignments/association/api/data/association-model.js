const mongoose = require("mongoose");
const contributionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }
})
const membersSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require:true
    },
    lastName: {
        type: String,
        require:true
    },
    phoneNumber: {
        type: String,
        require:true
    },
    dob: {
        type: Date,
        "default": Date.now
    },
    //type: ObjectId, Date, Buffer (for image)
    address: addressSchema,
    contribution: [contributionSchema]
});

// mongoose.model("Game", gamesSchema, "collection_name")

mongoose.model("Member", membersSchema, "members");
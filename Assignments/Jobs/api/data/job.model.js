const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    address: {
        type: String
    },
    state: {
        type: String,
    }
})
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    location: locationSchema,
    description: {
        type: String
    },
    experience: {
        type: Number
    },
    skills: {
        type: [String]
    },
    postDate: {
        type: Date,
        "default": Date.now()
    }
})

mongoose.model("Job", jobSchema, "jobs");
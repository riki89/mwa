const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    }
})
const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, //String,
    grade: Number,
    courses: [courseSchema]
});

// mongoose.model("Game", gamesSchema, "collection_name")

mongoose.model("Student", studentsSchema, "Students");
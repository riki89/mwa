const dbConnection = require("../data/db");

const mongoose = require("mongoose");

const Student = mongoose.model("Student");

module.exports.getAllStudents = function (req, res) {
    // res.send("OK");
    let offset = 0;
    let count = 4;
    let maxCount = 8;

    if (req.query && req.query.offset && req.query.count) {
        count = req.query.count;
        if (count > maxCount) {
            count = maxCount;
        }
    }

    Student.find().exec(function (err, students) {
        console.log("Found students", students.length);
        res.status(200).json(students);
    })
}

module.exports.studentsGetOne = function (req, res) {
    console.log("Json request received");
    const studentId = req.params.studentId;
    if (!studentId) {
        studentId = 1;
    }

    Student.findById(studentId).exec(function (err, doc) {
        console.log("Student found ", doc);
        res.status(200).json(doc);
    })
}
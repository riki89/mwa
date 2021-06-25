const dbConnection = require("../data/dbconnection");

const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.getAllCourses = function(req, res){
    const studentId = req.params.studentId;
    Student.findById(studentId).select("courses").exec(function(err, courses){
        console.log("Found courses", courses.length);
        res.status(200).json(courses);
    })
}


module.exports.courseGetOne = function(req, res){
    console.log("Get one publisher request received");
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    
    Student.findById(studentId).select("courses").exec(function(err, courses){
        console.log("Course found ", courses[courseId]);
        res.status(200).json(course[courseId]);
    })
}
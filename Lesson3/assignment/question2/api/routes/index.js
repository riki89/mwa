const app = require("express");
const router = app.Router();
const studentController = require("../controllers/student.controller");
const courseController = require("../controllers/course.controller");

router.route("/students").get(studentController.getAllStudents);
router.route("/students/:studentId").get(studentController.studentsGetOne);
router.route("/students/:studentId/courses").get(courseController.getAllCourses);
router.route("/students/:studentId/courses/:courseId").get(courseController.courseGetOne);

module.exports = router;
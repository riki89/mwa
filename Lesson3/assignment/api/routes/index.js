const app = require("express");
const router = app.Router();
const gamesController = require("../controllers/games.controller");
const studentController = require("../controllers/student.controller");
const courseController = require("../controllers/course.controller");

router.route("/games").get(gamesController.getAllGames);
router.route("/games/:gameId").get(gamesController.gamesGetOne);
router.route("/students").get(studentController.getAllStudents);
router.route("/students/:studentId").get(studentController.studentsGetOne);
router.route("/students/:studentId/courses").get(courseController.getAllCourses);
router.route("/students/:studentId/courses/:courseId").get(courseController.courseGetOne);

module.exports = router;
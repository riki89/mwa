const exp = require("constants");
const express = require("express");

const controllerJob = require("../controller/job.controller");
const controllerSkills = require("../controller/skills.controller");
const controllerLocation = require("../controller/location.controller");

const router = express.Router();

router.route("/job")
    .get(controllerJob.getAll)
    .post(controllerJob.addOne);

router.route("/job/:jobId")
    .get(controllerJob.getOne)
    .patch(controllerJob.jobPartialUpdate)
    .put(controllerJob.jobFullUpdate)
    .delete(controllerJob.jobDeleteOne);

router.route("/job/:jobId/skills")
    .get(controllerSkills.skillsGetAll)
    .post(controllerSkills.skillsAddOne);

router.route("/job/:jobId/skills/:skillId")
    .get(controllerSkills.skillsGetOne)///OK
    .put(controllerSkills.skillsUpdate)//OK
    .delete(controllerSkills.skillsDeleteOne);//OK

router.route("/job/:jobId/location")
    .get(controllerLocation.locationGetOne)// OK
    .post(controllerLocation.locationAddOne) //OK
    .patch(controllerLocation.locationPartialUpdate)//OK
    .put(controllerLocation.locationFullUpdate)//OK
    .delete(controllerLocation.locationDeleteOne);

module.exports = router;
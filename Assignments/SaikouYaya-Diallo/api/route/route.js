const exp = require("constants");
const express = require("express");

const controllerCity = require("../controller/City.controller");

const router = express.Router();

router.route("/cities")
    .get(controllerCity.getAll)
    .post(controllerCity.addOne);

router.route("/city/:cityId")
    .get(controllerCity.getOne)
    .delete(controllerCity.cityDeleteOne);

module.exports = router;
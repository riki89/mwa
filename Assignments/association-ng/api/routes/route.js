const express = require("express");
const controllerMembers = require("../controllers/member.controller");
const controllerAddress = require("../controllers/address.controller");
const controllerContribution = require("../controllers/contribution.controller");
const controllerUser = require("../controllers/user.controller");

const router = express.Router();
router.route("/members")
    .get(controllerMembers.membersGetAll)
    .post(controllerMembers.membersAddOne);

router.route("/members/:memberId")
    .get(controllerMembers.membersGetOne)
    .put(controllerMembers.membersFullUpdate)
    .patch(controllerMembers.membersPartialUpdate)
    .delete(controllerMembers.membersDeleteOne);

router.route("/members/:memberId/addresses")
    .get(controllerAddress.addressGetOne)
    .post(controllerAddress.addressAddOne);

router.route("/members/:memberId/addresses/:addressId")
    .put(controllerAddress.addressFullUpdateOne)
    .delete(controllerAddress.addressDeleteOne);


router.route("/members/:memberId/contributions")
    .get(controllerContribution.contributionGetAll)
    .post(controllerContribution.contributionAddOne);

router.route("/members/:memberId/contributions/:contributionId")
    .put(controllerContribution.contributionFullUpdate)
    .patch(controllerContribution.contributionPartialUpdate)
    .delete(controllerContribution.contributionDeleteOne);
//Users routes
router.route("/users")
    .post(controllerUser.register);

router.route("/users/login")
    .post(controllerUser.login);
    

module.exports = router;
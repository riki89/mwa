const mongoose = require("mongoose");

const Member = mongoose.model("Member");
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

module.exports.membersGetAll = function (req, res) {
    console.log("Json request received");
    const response = {
        status: successError,
        message: res
    }
    let offset = 0;
    let count = 5;
    const maxCount = 8;


    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(userError).json({ "message": "QueryString offset or count are not valid number" });
        return;
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > maxCount) {
            // count = maxCount;
            console.log("maxCount exceeded");
            res.status(userError).json({ "message": "Can not exceed count of " + maxCount });
        }
    }


    Member.find().exec(function (err, members) {
        if (err) {
            console.log("Error finding members ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found members", members.length);
            // res.status(200).json(members);
            response.status = successError;
            response.message = members;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.membersGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const memberId = req.params.memberId;
    const idLength = 24;
    if (memberId.length != idLength) {
        res.status(userError).json({ "message": "The length of the member's ID should be " + idLength });
        return;
    }

    Member.findById(memberId).exec(function (err, doc) {
        if (err) {
            console.log("Found member error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("Member ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "Member ID not found" };
        } else {
            console.log("Member found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.membersAddOne = function (req, res) {
    console.log("Add one member");
    // const db = dbConnection.get();
    // const collection = db.collection("members");
    let dob = req.body.dob;
    if (!dob){
        dob = Date.now();
    }
    let newMember = {
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        dob: dob,
        address: {},
        contribution: [],


    };
    Member.create(newMember, function (err, member) {
        const response = {
            status: successError,
            message: member
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Member", member);
            response.status = successError;
            response.message = member;
        }
        res.status(response.status).json(response.message);

    })
}

module.exports.membersFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const memberId = req.params.memberId;
    const idLength = 24;
    if (memberId.length != idLength) {
        res.status(userError).json({ "message": "The length of the member's ID should be " + idLength });
        return;
    }

    Member.findById(memberId).exec(function (err, member) {
        if (err) {
            console.log("Found member error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!member) {
            console.log("Member ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "Member ID not found" };
        }
        if (member) {

            member.title = req.body.title;
            member.firstName = req.body.firstName;
            member.lastName = req.body.lastName;
            member.phoneNumber = req.body.phoneNumber;
            member.dob = req.body.dob;

            member.save(function (err, updatedMember) {
                if (err) {
                    console.log("Member not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Member not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedMember
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.membersPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const memberId = req.params.memberId;
    const idLength = 24;
    if (memberId.length != idLength) {
        res.status(userError).json({ "message": "The length of the member's ID should be " + idLength });
        return;
    }

    Member.findById(memberId).exec(function (err, member) {
        if (err) {
            console.log("Found member error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!member) {
            console.log("Member ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "Member ID not found" };
        } if (member) {
            if (req.body.title) {
                member.title = req.body.title;
            }
            if (req.body.firstName) {
                member.firstName = req.body.firstName;
            }
            if (req.body.lastName) {
                member.lastName = req.body.lastName;
            }
            if (req.body.phoneNumber) {
                member.phoneNumber = req.body.phoneNumber;
            }
            if (req.body.dob) {
                member.dob = req.body.dob;
            }

            member.save(function (err, updatedMember) {
                if (err) {
                    console.log("Member not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Member not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedMember
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.membersDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const memberId = req.params.memberId;
    const idLength = 24;
    if (memberId.length != idLength) {
        res.status(userError).json({ "message": "The length of the member's ID should be " + idLength });
        return;
    }

    Member.findByIdAndRemove(memberId).exec(function (err, deletedMember) {
        if (err) {
            console.log("Found member error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedMember) {
            console.log("Member ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "Member ID not found" };
        } else {
            console.log("Member deleted ", deletedMember);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedMember;
        }
        res.status(response.status).json(response.message);
    });
}

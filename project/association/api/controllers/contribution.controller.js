const mongoose = require("mongoose");
const Member = mongoose.model("Member");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addContribution = function (req, res, member) {
    const newContribution = {
        amount: req.body.amount,
        type: req.body.type,
        date: req.body.date
    }
    member.contribution.push(newContribution);

    member.save(function (err, updatedMember) {
        const response = {
            status: successError,
            message: updatedMember
        }
        if (err) {
            response.status = serverError;
            response.message = err;
        } else {
            response.status = successError;
            response.message = updatedMember;
        }
        res.status(response.status).json(response.message);

    })

}


module.exports.contributionGetAll = function (req, res) {
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one contribution request received");
    const memberId = req.params.memberId;

    Member.findById(memberId).select("contribution").exec(function (err, contribution) {
        if (err) {
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = contribution;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.contributionGetOne = function (req, res) {
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one contribution request received");
    const memberId = req.params.memberId;

    Member.findById(memberId).select("contribution").exec(function (err, contribution) {
        if (err) {
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = contribution;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.contributionAddOne = function (req, res) {
    console.log("Add one contribution");
    const memberId = req.params.memberId;
    Member.findById(memberId).exec(function (err, member) {
        const response = {
            status: 200,
            message: member
        }
        if (err) {
            response.status = serverError,
                response.message = err;
        } else if (!member) {
            console.log("Error creating member");
            response.status = notFoundError,
                response.message = { "message": "Member ID not found" };
        }
        if (member) {
            _addContribution(req, res, member);
        } else {
            res.status(response.status).json(response.message);
        }
    })

}

module.exports.contributionFullUpdate = function (req, res) {
    console.log("Get one contribution request received");
    const response = {
        status: 200,
        message: []
    }
    const memberId = req.params.memberId;
    const contId = req.params.contributionId;
    if (!memberId || !contId) {
        response.status = notFoundError;
        response.message = "Member or Contribution ID not found";
        res.status(response.status).json(response.message);
        return;
    }

    Member.findById(memberId).exec(function (err, member) {
        if (err) {
            console.log("Member not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!member) {
            response.status = notFoundError;
            response.message = { "message": "Publisher not found" }
        } if (member) {

            const cont = {
                amount: parseFloat(req.body.amount),
                type: req.body.type
                // date: req.body.date
            }
            // member.contribution.push(cont);
            let contFound = 0;
            let id = 0;
            member.contribution.forEach(c => {
                if (c._id == contId) {
                    contFound = 1;
                    member.contribution[id] = cont;
                }
                id++;
            });
            if (contFound === 0) {
                res.status(404).json({ "message": "Contribution ID not found", "_id": contId });
                return;
            }
            // console.log("before save ", member.contribution);
            member.save(function (err, updatedMember) {
                const response = {
                    status: successError,
                    message: updatedMember
                }
                if (err) {
                    response.status = serverError;
                    response.message = err;
                } else {
                    response.status = successError;
                    response.message = updatedMember;
                }
                res.status(response.status).json(response.message);

            })
        }
    })
}

module.exports.contributionPartialUpdate = function (req, res) {
    console.log("Get one contribution request received");
    const response = {
        status: 200,
        message: []
    }
    const memberId = req.params.memberId;
    const contId = req.params.contributionId;
    if (!memberId || !contId) {
        response.status = notFoundError;
        response.message = "Member or Contribution ID not found";
        res.status(response.status).json(response.message);
        return;
    }

    Member.findById(memberId).exec(function (err, member) {
        const cont = {};
        if (err) {
            console.log("Member not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!member) {
            response.status = notFoundError;
            response.message = { "message": "Publisher not found" }
        } if (member) {
            if (req.body.amount) {
                cont.amount = parseFloat(req.body.amount);
            }
            if (req.body.type) {
                cont.type = req.body.type;
            }
            if (req.body.date) {
                cont.date = req.body.date;
            }
        }
        let contFound = 0;
        let id = 0;
        member.contribution.forEach(c => {
            if (c._id == contId) {
                contFound = 1;
                member.contribution[id] = cont;
            }
            id++;
        });
        if (contFound === 0) {
            res.status(404).json({ "message": "Contribution ID not found", "_id": contId });
            return;
        }
        // console.log("before save ", member.contribution);
        member.save(function (err, updatedMember) {
            const response = {
                status: successError,
                message: updatedMember
            }
            if (err) {
                response.status = serverError;
                response.message = err;
            } else {
                response.status = successError;
                response.message = updatedMember;
            }
            res.status(response.status).json(response.message);

        })
    })
}


module.exports.contributionDeleteOne = function (req, res) {
    console.log("Get one contribution request received");
    const response = {
        status: 200,
        message: []
    }
    const memberId = req.params.memberId;

    Member.findById(memberId).exec(function (err, member) {
        if (err) {
            console.log("Member not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!member) {
            response.status = notFoundError;
            response.message = { "message": "Member not found" }
        }
        if (member) {
            member.contribution.remove();
            member.save(function (err, deletedMember) {
                if (err) {
                    console.log("Member not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Member not updated"+err }
                } else {
                    response.message = deletedMember
                }
            })
        }
        res.status(response.status).json(response.message);
    })
}
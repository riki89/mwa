const mongoose = require("mongoose");
const Job = mongoose.model("Job");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addSkill = function (req, res, job) {
    job.skills.push(req.body.name);

    job.save(function (err, updateJob) {
        const response = {
            status: successError,
            message: updateJob
        }
        if (err) {
            response.status = serverError;
            response.message = err;
        } else {
            response.status = successError;
            response.message = updateJob;
        }
        res.status(response.status).json(response.message);

    })

}

module.exports.skillsGetAll = function (req, res) {
    const response = {
        status: 200,
        message: res
    }
    console.log("Get all skills request received");
    const jobId = req.params.jobId;

    Job.findById(jobId).select("skills").exec(function (err, skills) {
        if (err) {
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = skills;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.skillsGetOne = function (req, res) {
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one skill request received");
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    const idLength = 24;
    if (jobId.length !== idLength){
        response.status = 400;
        response.message = "The Job's ID length should be "+idLength;
        res.status(response.status).json(response.message);
        return;
    }

    Job.findById(jobId).select("skills").exec(function (err, job) {
        if (err) {
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = job.skills[skillId];
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.skillsAddOne = function (req, res) {
    console.log("Add one skill");
    const jobId = req.params.jobId;
    Job.findById(jobId).exec(function (err, job) {
        const response = {
            status: 200,
            message: job
        }
        if (err) {
            response.status = serverError,
                response.message = err;
        } else if (!job) {
            console.log("Error founding job");
            response.status = notFoundError,
                response.message = { "message": "Job ID not found" };
        }
        if (job) {
            _addSkill(req, res, job);
        } else {
            res.status(response.status).json(response.message);
        }
    })

}

module.exports.skillsUpdate = function (req, res) {
    console.log("Get one skills request received");
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    const idLength = 24;
    if (jobId.length != idLength) {
        response.status = 400;
        response.message = "The length of and Job ID should be " + idLength;
        res.status(response.status).json(response.message);
        return;
    }

    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Job not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!job) {
            response.status = notFoundError;
            response.message = { "message": "Skills not found" }
        } if (job) {
            let skillIdFound = 0;
            job.skills.forEach(skill => {
                if (skillIdFound == skillId) {
                    job.skills[skillIdFound] = req.body.name;
                }
                skillIdFound++;
            });
            job.save(function (err, updateJob) {
                const response = {
                    status: successError,
                    message: updateJob
                }
                if (err) {
                    response.status = serverError;
                    response.message = err;
                } else {
                    response.status = successError;
                    response.message = updateJob;
                }
                res.status(response.status).json(response.message);

            })
        }
    })
}

module.exports.skillsDeleteOne = function (req, res) {
    console.log("Get one skills request received");
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    const idLength = 24;
    if (jobId.length != idLength) {
        response.status = 400;
        response.message = "The length of Job ID should be " + idLength;
        res.status(response.status).json(response.message);
        return;
    }
    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Job not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!job) {
            response.status = notFoundError;
            response.message = { "message": "Publisher not found" }
        }
        if (job) {
            let skillIdFound = 0;
            let removedSkill = "";
            job.skills.forEach(skill => {
                if (skillIdFound == skillId) {
                    job.skills.remove(skill);
                    removedSkill = skill;
                    //console.log("SKill removed", skill);
                }
                skillIdFound++;
            });

            //job.skills.remove();
            job.save(function (err, deletedSkills) {
                if (err) {
                    console.log("Job not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Job not updated" }
                } else {
                    response.message = removedSkill;
                }
            })
        }
        res.status(response.status).json(response.message);
    })
}
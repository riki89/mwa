const { ObjectId } = require("bson");
const { response } = require("express");
const mongoose = require("mongoose");
const { off } = require("process");

Job = mongoose.model("Job");
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

module.exports.getAll = function(req, res){
    console.log("Get All Jobs");

    const response = {
        status: 200,
        message: []
    }
    let offset = 0;
    let defaultCount = 6;
    let count = defaultCount;
    let maxCount = 8;
    if (req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count){
        count = parseInt(req.query.count);
    }
    if (!isNaN(offset) && isNaN(count)){
        response.status = 400;
        response.message = "QueryString offset and count are not valid numbers";
    }
    if (count > maxCount){
        count = maxCount;
    }
    if (count < 0){
        count = defaultCount;
    }
    Job.find().limit(count).exec(function(err, job){
        if (err){
            console.log("Erro finding games");
            response.status = 404;
            response.message = err;
        } else {
            if (!job){
                console.log("No job found");
                response.status = 404;
                response.message = "No job found";
            } else {
                response.message = job;
            }
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.getOne = function(req, res){
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;
    const idLength = 24;
    if (jobId.length != idLength){
        response.status = 400;
        response.message = "The length of the job ID should be "+idLength;
    }

    Job.findById(jobId).exec(function(err, job){
        if (err){
            console.log("Error finding job");
            response.status = 500;
            response.message = err;
        } else {
            if (!job){
                response.status = 404;
                response.message = "Job not found!";
            } else {
                response.message = job;
            }
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.addOne = function(req, res){
    const response = {
        status: 200,
        message: []
    }
    console.log("body: ",req.body);
    let newJob = {
        title: req.body.title,
        salary: req.body.salary,
        description: req.body.description,
        location: {}
    }
    Job.create(newJob, function(err, job){
        if (err){
            console.log("Error create Job");
            response.status = 500;
            response.message = err;
        } else {
            response.message = job;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.jobFullUpdate = function(req, res){
    const response = {
        status : 200,
        message : []
    };
    console.log("Job full update request received");
    const jobId = req.params.jobId;
    const idLength = 24;
    if (jobId.length != idLength) {
        response.status = 400;
        response.message = "The length of the game's ID should be " + idLength;
        return;
    }

    Job.findById(jobId).exec(function(err, job){
        if (err) {
            console.log("Found job error", err);
            response.status = 404;
            response.message = err;
        } else if (!job) {
            console.log("Job ID not found ");
            response.status = 404;
            response.message = { "message": "Job ID not found" };
        }
        if (job){
            job.title = req.body.title;
            job.salary = parseInt(req.body.salary);
            job.description = req.body.description;
            // job.postDate = req.body.postDate;
        }
        job.save(function (err, updatedJob) {
            if (err) {
                console.log("Job not updated");
                response.status = notFoundError;
                response.message = { "message": "Job not updated" }
            } else {
                // response.status = notFoundError;
                response.message = updatedJob
            }
            res.status(response.status).json(response.message);
        })
    })
}

module.exports.jobPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const jobId = req.params.jobId;
    const idLength = 24;
    if (jobId.length != idLength) {
        res.status(userError).json({ "message": "The length of the job's ID should be " + idLength });
        return;
    }

    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Found job error", err);
            response.status = 404;
            response.message = err;
        } else if (!job) {
            console.log("Job ID not found ");
            response.status = userError;
            response.message = { "message": "JOb ID not found" };
        } if (job) {
            if (!job.location){
                job.location = {};
            }
            if (!job.skills){
                job.skills = [{_id: ObjectId()}];
            }
            if (req.body.title) {
                job.title = req.body.title;
            }
            if (req.body.salary) {
                job.salary = parseFloat(req.body.salary);
            }
            
            if (req.body.description) {
                job.description = req.body.description;
            }
            if (req.body.postDate) {
                job.postDate = req.body.postDate;
            }

            job.save(function (err, updatedJob) {
                if (err) {
                    console.log("Job not updated", err);
                    response.status = notFoundError;
                    response.message = { "message": "Job not updated" }
                } else {
                    response.message = updatedJob
                }
                res.status(response.status).json(response.message);
            })
        }
    });
}

module.exports.jobDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const jobId = req.params.jobId;
    const idLength = 24;
    if (jobId.length != idLength) {
        res.status(userError).json({ "message": "The length of the job's ID should be " + idLength });
        return;
    }

    Job.findByIdAndRemove(jobId).exec(function (err, deletedJob) {
        if (err) {
            console.log("Found job error", err);
            response.status = userError;
            response.message = err;
        } else if (!deletedJob) {
            console.log("Job ID not found ");
            response.status = notFoundError;
            response.message = { "message": "Job ID not found" };
        } else {
            console.log("Job deleted ", deletedJob);
            response.status = successError;
            response.message = deletedJob;
        }
        res.status(response.status).json(response.message);
    });
}
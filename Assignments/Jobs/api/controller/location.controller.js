const mongoose = require("mongoose");
const Job = mongoose.model("Job");

const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const _addLocation = function (req, res, job) {

    if (!job.location){
        job.location = {};
    }
    job.location.address = req.body.address;
    job.location.state = req.body.state;
    job.save(function (err, updatedLocation) {
        const response = {
            status: successError,
            message: updatedLocation
        }
        if (err) {
            response.status = serverError;
            response.message = err;
        } else {
            response.status = successError;
            response.message = updatedLocation;
        }
        res.status(response.status).json(response.message);

    })

}

module.exports.locationGetOne = function (req, res) {
    const response = {
        status: 200,
        message: res
    }
    console.log("Get one location request received");
    const jobId = req.params.jobId;

    Job.findById(jobId).select("location").exec(function (err, location) {
        if (err) {
            response.status = notFoundError;
            response.message = err;
        } else {
            response.message = location;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.locationAddOne = function (req, res) {
    console.log("Add one location");
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
            console.log("Error creating job");
            response.status = notFoundError,
                response.message = { "message": "Job ID not found" };
        }
        if (job) {
            _addLocation(req, res, job);
        } else {
            res.status(response.status).json(response.message);
        }
    })

}

module.exports.locationFullUpdate = function (req, res) {
    console.log("Get one location request received");
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Job not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!job) {
            response.status = notFoundError;
            response.message = { "message": "Job not found" }
        } if (job) {
            job.location.address = req.body.address;
            job.location.state = req.body.state;
            job.save(function (err, updatedLocation) {
                const response = {
                    status: successError,
                    message: updatedLocation
                }
                if (err) {
                    response.status = serverError;
                    response.message = err;
                } else {
                    response.status = successError;
                    response.message = updatedLocation;
                }
                res.status(response.status).json(response.message);

            })
        }
    })
}

module.exports.locationPartialUpdate = function (req, res) {
    console.log("Get one location request received");
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Job not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!job) {
            response.status = notFoundError;
            response.message = { "message": "Job not found" }
        } if (job) {
            if (req.body.address){
                job.location.address = req.body.address;
            }
            if (req.body.state){
                job.location.state = req.body.state;
            }
            job.save(function (err, updatedLocation) {
                const response = {
                    status: successError,
                    message: updatedLocation
                }
                if (err) {
                    response.status = serverError;
                    response.message = err;
                } else {
                    response.status = successError;
                    response.message = updatedLocation;
                }
                res.status(response.status).json(response.message);

            })
        }
    })
}

module.exports.locationDeleteOne = function (req, res) {
    console.log("Delete one location request received");
    const response = {
        status: 200,
        message: []
    }
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function (err, job) {
        if (err) {
            console.log("Job not updated");
            response.status = notFoundError;
            response.message = err;
        } else if (!job) {
            response.status = notFoundError;
            response.message = { "message": "Location not found" }
        }
        if (job) {
            job.location.remove();
            job.save(function (err, deletedJob) {
                if (err) {
                    console.log("Job not updated");
                    response.status = notFoundError;
                    response.message = { "message": "Job not updated" }
                } else {
                    response.message = deletedJob
                }
            })
        }
        res.status(response.status).json(response.message);
    })
}
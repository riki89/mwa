const { ObjectId } = require("bson");
const { response } = require("express");
const mongoose = require("mongoose");
const { off } = require("process");

City = mongoose.model("City");
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;

const runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxDistance = parseFloat(req.query.maxDistance);
    if (!maxDistance){
        maxDistance = 1000;
    }
    const query = {
        "loc":{
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: maxDistance,
                $minDistance: 0
            }
        }
    };
    City.find(query).exec(function(err, city){
        if (err){
            res.status(500).json("err: "+err);
        } else {
            console.log("Found cities", city);
            res.status(200).json(city);
        }
    })
}

module.exports.getAll = function(req, res){
    console.log("Get All Cities");

    const response = {
        status: 200,
        message: []
    }
    let offset = 0;
    let defaultCount = 5;
    let count = defaultCount;
    let maxCount = 8;

    //find nearby cities
    if (req.query && req.query.lng && req.query.lat){
        runGeoQuery(req, res);
        return ;
    }
    if (req.query && req.query.maxDistance){
        runGeoQuery(req, res);
        return;
    }
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
    City.find().skip(offset).limit(count).exec(function(err, city){
        if (err){
            console.log("Error finding cities");
            response.status = 404;
            response.message = err;
        } else {
            if (!city){
                console.log("No city found");
                response.status = 404;
                response.message = "No city found";
            } else {
                response.message = city;
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
    const cityId = req.params.cityId;
    const idLength = 24;
    if (cityId.length != idLength){
        response.status = 400;
        response.message = "The length of the city ID should be "+idLength;
    }

    City.findById(cityId).exec(function(err, city){
        if (err){
            console.log("Error finding city");
            response.status = 500;
            response.message = err;
        } else {
            if (!city){
                response.status = 404;
                response.message = "City not found!";
            } else {
                response.message = city;
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
    let newCity = {
        city: req.body.city,
        zip: req.body.zip,
        pop: parseInt(req.body.pop),
        state: req.body.state,
    }
    City.create(newCity, function(err, city){
        if (err){
            console.log("Error create City");
            response.status = 500;
            response.message = err;
        } else {
            //console.log("Creation sucessFull", city);
            response.message = city;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.cityDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const cityId = req.params.cityId;
    const idLength = 24;
    if (cityId.length != idLength) {
        res.status(userError).json({ "message": "The length of the city's ID should be " + idLength });
        return;
    }

    City.findByIdAndRemove(cityId).exec(function (err, deletedCity) {
        if (err) {
            console.log("Found city error", err);
            response.status = userError;
            response.message = err;
        } else if (!deletedCity) {
            console.log("City ID not found ");
            response.status = notFoundError;
            response.message = { "message": "City ID not found" };
        } else {
            console.log("City deleted ", deletedCity);
            response.status = successError;
            response.message = deletedCity;
        }
        res.status(response.status).json(response.message);
    });
}
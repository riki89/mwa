const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = function(req, res){
    const response = {
        status: 200,
        message: []
    }
    console.log("Controller Register");
    bcrypt.hash(req.body.password, 10, function(error, hashedPassword){
        if (error){
            console.log("Error pawword", error);
            response.status = 400;
            response.message = error;
        } else {
            const newUser = {
                username: req.body.username,
                password: hashedPassword, //bcrypt.hashSync(hashedPassword, bcrypt.genSaltSync(10)),
                name: req.body.name
            };
            User.create(newUser, function(error, user){
                if (error){
                    console.log("User error: ",error);
                    response.status = 500;
                    response.message = error;
                } 
                if (user){
                    response.message = user;
                }
                res.status(response.status).json(response.message);
            });
        }
    })
}

module.exports.login = function(req, res){
    console.log("Controller login");
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}).exec(function(error, user){
        const response = {
            status: 200,
            message: []
        }
        if (error){
            console.log(error);
            response.status = 500;
            response.message = error;
        } 
        if (user){
            // if (bcrypt.compareSync(password, user.password){
            //     console.log("User found", user);
            //     let secret = "cs572";
            //     const token = jwt.sign({name: user.name}, secret, {expiresIn: 3600}); //1 hour
            //     response.message = "{success: true, token:"+token+"}";
            // } else {
            //     console.log("password incorrect");
            //     response.status = 404;
            //     response.message = "{}";
            // }
            if (bcrypt.compare(password, user.password, function(error, result){
                if (error){
                    console.log("password incorrect");
                    response.status = 404;
                    response.message = "{}";
                } else {
                    console.log("User found", user);
                    let secret = "cs572";
                    const token = jwt.sign({name: user.name}, secret, {expiresIn: 3600}); //1 hour
                    response.message = "{success: true, token:"+token+"}";
                }
            }))
            response.message = user;
        } else {
            console.log("User not found");
            response.status = 404;
            response.message = "Unauhtorized";
        }
        res.status(response.status).json(response.message);
    })
}
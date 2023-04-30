var qs = require('querystring');
const User = require("../models/user_model");



exports.create = (req, res) => {

    console.log(req.body);


    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });

    }

    const user = new User({
        user_id: req.body.user_id,
        name: req.body.name,
        birthdate: req.body.birthdate,
        username: req.body.username,


    });

    User.create(user, (err,data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Task."
            });
        else res.send(data);
        
    });
};

exports.findAll = (req,res) => {
    const title = req.query.name;
    User.getAll(title, (err,data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tasks."
            });
        else res.send(data);
    });
};

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);
    User.updateById(
        req.query.user_id,
        new User(req.body),
        (err,data) => {
            if(err){
                if (err.kind == "not found"){
                    res.status(404).send({
                        message: 'Not found Tutorial with id ${req.query.user_id}.'
                    });
                } else{
                    res.status(500).send({
                        message: "Error updating tutorial with id" + req.query.user_id
                    });
                }
               
            } else res.send(data);
        }
    );
};

exports.delete = (req,res) => {
    User.remove(req.query.id, (err,data) => {
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    message: 'Not found User with user_id ${req.query.user_id}.'
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with user_id" + req.query.user_id
                });
            }
        } else res.send({message: 'User was deleted succesfully!'});
    });
};
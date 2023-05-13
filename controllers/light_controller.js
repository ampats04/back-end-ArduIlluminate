var qs = require('querystring');
const Light = require("../models/light_model");



exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const newLight = new Light({
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        install_date: req.body.install_date,
        watt: req.body.watt,
    });

    

    const userID = req.body.user_id; // Get userID from the logged-in user

    Light.create(userID, newLight, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Task."
            });
            return;
        }
        const light_id = data.insertId;

    // Send the light_id back as a response
    res.send({ light_id });
    });
};

exports.findOne = (req, res) => {

    const {user_id, light_id} = req.params;

    Light.findById(user_id, light_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found LIGHT with id ${req.params.light_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving LIGHT with id " + req.params.light_id
          });
        }
      } else res.send(data);
    });
  };
  

exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);
    Light.updateById(
        req.query.light_id,
        new User(req.body),
        (err,data) => {
            if(err){
                if (err.kind == "not found"){
                    res.status(404).send({
                        message: 'Not found Tutorial with light_id ${req.query.light_id}.'
                    });
                } else{
                    res.status(500).send({
                        message: "Error updating tutorial with light_id" + req.query.light_id
                    });
                }
               
            } else res.send(data);
        }
    );
};

exports.delete = (req,res) => {
    Light.remove(req.query.id, (err,data) => {
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    message: 'Not found Light with light_id ${req.query.light_id}.'
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with light_id" + req.query.light_id
                });
            }
        } else res.send({message: 'Light was deleted succesfully!'});
    });
};
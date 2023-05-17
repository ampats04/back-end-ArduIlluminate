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

    

    const {user_id} = req.body; // Get userID from the logged-in user

    Light.create(user_id, newLight, (err, data) => {
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
            message: `Not found LIGHT with id ${light_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving LIGHT with id  ${light_id}"
          });
        }
      } else res.send(data);
    });
  };
  

  exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    const {user_id, lightId} = req.params;


    Light.updateById(user_id, lightId, req.body, (err, data) => {
      if (err) {
        if (err.kind == "not_found") {
          res.status(404).send({
            message: `Not found Light with userID ${user_id} and light_id ${lightId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating tutorial with userID " + user_id + " and light_id " + lightId,
          });
        }
      } else {
        res.send(data);
      }
    });
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
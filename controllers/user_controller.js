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

exports.getUserId = () => {
  return user_id;
};

exports.findOne = (req, res) => {

  User.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};

exports.update =  (req, res) => {
  try {
    const { user_id } = req.params;

    User.updateById(user_id, req.body, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while updating the user.",
        });
      } else {
        if (result === null) {
          res.status(404).send({
            message: `User with id ${user_id} not found`,
          });
        } else {
          res.status(200).send({
            message: `User with id ${user_id} updated successfully`,
          });
        }
      }
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the user.",
    });
  }
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
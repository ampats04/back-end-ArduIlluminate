const db_con = require("../database/database");


const userModel = function(user){

    this.user_id = user.user_id;
    this.name = user.name;
    this.birthdate = user.birthdate;
    this.username = user.username;
};


userModel.create = (newUser, result) => {
    db_con.query("INSERT INTO users SET ?", newUser, (err,res) => {
            if(err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
        console.log("Created User: ", {user_id: res.insertId, ...newUser});
        console.log("added new user")
       
    });
}

userModel.findById = (user_id, result) => {
    console.log("The id is",user_id);
    db_con.query(`SELECT * FROM users WHERE user_id = '${user_id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user_id: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Task with the id
      result({ kind: "not_found" }, null);
  
    });
  
  };


  userModel.updateById = (user_id, user, result) => {

    db_con.query(
        "UPDATE users SET  name = ?, birthdate = ?, username = ? WHERE user_id = ?",
        [ user.name, user.birthdate, user.username, user_id],
        (err,res) => {
            if(err){
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if(res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("updated user: ", {user_id: user_id, ...user});
            result(null, {user_id: user_id, ...user});
        }
    );
}


userModel.remove = (user_id, result) => {
    db_con.query("DELETE FROM users WHERE user_id =?", user_id, (err,res) => {
        if(err){

            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not found"}, null);
            return;
        }
        console.log("deleted task with id: " , user_id);
        result(null,res);
    })
}


    module.exports = userModel
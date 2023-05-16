const db_con = require("../database/database");



const lightModel = function(light){
    
   this.model = light.model;
   this.manufacturer = light.manufacturer;
   this.install_date = light.install_date;
   this.watt = light.watt;

};

lightModel.create = (userID, light, callback) => {
    const sql = "INSERT INTO lights (userID, model, manufacturer, install_date, watt) VALUES (?, ?, ?, ?, ?)";
    const values = [userID, light.model, light.manufacturer, light.install_date, light.watt];
  
    db_con.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error(error);
        callback(error, null);
        return;
      }
  
      const createdLight = {
        light_id: results.insertId, 
        userID: userID,
        model: light.model,
        manufacturer: light.manufacturer,
        install_date: light.install_date,
        watt: light.watt
      };
  
      console.log("Created Light: ", createdLight);
      console.log(results.insertId)
      callback(null, createdLight);
    });
  };
  
  lightModel.findById = (user_id, light_id, result) => {

    console.log("User Id: ", user_id);
    console.log("Light id is",light_id);

    db_con.query(`SELECT * FROM lights WHERE userID = '${user_id}' LIMIT 1`, 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found light_id: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Task with the id
      result({ kind: "not_found" }, null);
  
    });
  
  };

  lightModel.updateById = (userId, lightId, light, result) => {
    print('This is the user_id' + userId);
    print('This is the light_id' + lightId);
    
    db_con.query(
      "UPDATE lights SET model = ?, manufacturer = ?, install_date = ?, watt = ? WHERE userID = ? AND light_id = ?",
      [light.model, light.manufacturer, light.install_date, light.watt, userId, lightId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated lights: ", { light_id: lightId, ...light });
        result(null, { light_id: lightId, ...light });
      }
    );
  };

lightModel.remove = (light_id, result) => {
    db_con.query("DELETE FROM users WHERE light_id =?", light_id, (err,res) => {
        if(err){

            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not found"}, null);
            return;
        }
        console.log("deleted light with id: " , light_id);
        result(null,res);
    })
}


    module.exports = lightModel
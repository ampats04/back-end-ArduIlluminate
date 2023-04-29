const db_con = require("../database/database");


const lightModel = function(light){

   this.model = light.model;
   this.manufacturer = light.manufacturer;
   this.install_date = light.install_date;
   this.power_cons = light.power_cons;

};


lightModel.create = (newLight, result) => {
    db_con.query("INSERT INTO lights SET ?", newLight, (err,res) => {
            if(err){
                console.log("error: ", err);
                result(err,null);
                return;
            }
        console.log("Created Light: ", {light_id: res.lightId, ...newLight});
        console.log("added new Light")
       
    });
}

lightModel.getAll = (light_id,result) => {

    let query = "SELECT * FROM lights";

    if(light_id){
        query += `WHERE user_id LIKE '%${light_id}%'`;
    }
    db_con.query(query, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(null,err);
            return;
        }
        console.log("Light: ", res);
        return(null, err);
    });
};

lightModel.updateById = (light_id, light, result) => {

    db_con.query(
        "UPDATE lights SET model = ?, manufacturer = ?, install_date = ?, power_cons = ?  WHERE light_id = ?",
        [ light.model, light.manufacturer, light.install_date, light.power_cons, light_id],
        (err,res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if(res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("updated light: ", {light_id: light_id, ...light});
            result(null, {light_id: light_id, ...light});
        }
    );
}


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
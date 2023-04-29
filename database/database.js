const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'mtonilon',
    database: 'ardudb',
    port: 3306,

});

mysqlConnection.connect(function (error){

    if(error){
        console.error('error connecting: ' + error.stack);
        return;
    }else{
        console.log('Database is connected');
    }
});

module.exports = mysqlConnection
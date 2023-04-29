const express = require('express');
const app = express();


const userRoutes = require('./routes/user_routes');
const lightRoutes = require('./routes/light_routes');

//settings
app.set('port', process.env.PORT || 8000);

//Middlewares
app.use(express.json());

//Routes

app.use("/",userRoutes)
app.use("/",lightRoutes)

app.get('/', (req,res) => {
    res.send({"message": "welcome", })
})

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});




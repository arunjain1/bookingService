const express = require("express");
const bodyparser = require("body-parser");
const {PORT} = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const db = require('./models/index');
const app  = express();


const startServer = async()=>{
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));  

    app.use('/api',ApiRoutes);

    app.listen(PORT,()=>{
        console.log(`Server is running at Port ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true})
        }
    })
}

startServer();


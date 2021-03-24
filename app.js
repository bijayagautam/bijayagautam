const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session')
//Loading environment variable from the file here
require('dotenv').config({path:"./config/keys.env"});

const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Handaling incoming body post request
app.use(bodyParser.urlencoded({ extended: false }))

//Handlebars middleware : Telling Express to set or register Handlebars as its' Template/View Engine : Must Be After the app object
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Custom middleware - Allowing specific links that are submitted to send PUT and DELETE request respectively
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }
    next(); //very important to move to next route
})

//Allowing Fileupload here
app.use(fileUpload()); //Must be before routes

//Session Midleware
app.use(session({
    secret: `${process.env.SESSION_TOKEN}`,
    resave: false,
    saveUninitialized: true
}))

//Custom -  Middleware functions
app.use((req,res,next)=>{
    //res.locals.user is a global handlebars variable which can be access in every single handlebars file 
    res.locals.user = req.session.userInfo;
    next();
});

//Loading controllers here
const generalController = require("./controllers/general");
const projectController = require("./controllers/project");
const userController = require("./controllers/user");

//Mapping each Controller to app object here
app.use("/",generalController); //checks route in general controller and moves to next controller for route check
app.use("/project",projectController);
app.use("/user",userController);

//Connecting to Database
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Database Connection Successful!`);
})
.catch(err=>
    console.log(`Error Occured while connecting to database, Please contact your database administrator! ${err}!`)
);

//Creating Web Server here
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})
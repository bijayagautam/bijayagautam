const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');


const app = express();

//Allowing express to make static content avialable from the public
app.use(express.static('public'))

//Handaling incoming body post request
app.use(bodyParser.urlencoded({ extended: false }))

//Handlebars middleware : Telling Express to set or register Handlebars as its' Template/View Engine : Must Be After the app object
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Loading controllers here
const generalController = require("./controllers/general");
const projectController = require("./controllers/project");

//Mapping each Controller to app object here
app.use("/",generalController); //checks route in general controller and moves to next controller for route check
app.use("/project",projectController);

//Creating Web Server here
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})
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

//Routing
//Home Route
app.get("/",(req,res)=>{

    res.render("general/home");
});

// Contact Route
app.get("/contact",(req,res)=>{

    res.render("general/contact");
});

// Contact Form Submit
app.post("/contact",(req,res)=>{

    res.render();
});

// Project List Route
app.get("/project/list",(req,res)=>{

    res.render("projects/projectList");
});

// Project Add Route
app.get("/project/add",(req,res)=>{

    res.render("projects/projectList");
});

// Add project Form Submit
app.post("/project/add",(req,res)=>{

    res.render();
});


//Creating Web Server
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Web server is up and running at ${PORT}!`)
})
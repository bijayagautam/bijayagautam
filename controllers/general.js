const express = require('express')
const router = express.Router();

//Setting up routes
//Home Route
router.get("/",(req,res)=>{

    res.render("general/home",{
        title: "Bijaya Gautam | Home Page",
        description: "Welcome to home page."
    })

});

// Contact Route
router.get("/contact",(req,res)=>{

    res.render("general/contact",{
        title: "Bijaya Gautam | Contact Page",
        description: "Welcome to contact page."
    })

});


module.exports = router;
const express = require('express')
const router = express.Router();

//Setting up routes
//Portfolio View Route
router.get("/list",(req,res)=>{

    res.render("projects/projectList",{
        title: "Portfolio Page",
        description: "Welcome to portfolio page."
    })

});

//Project Add Route
router.get("/add",(req,res)=>{

    res.render("projects/projectAdd",{
        title: "Project Add Page",
        description: "Welcome to project add page."
    })

});


module.exports = router;
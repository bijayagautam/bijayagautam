const express = require('express')
const router = express.Router();
//Importing models data
const projectModel = require("../models/Project");
const path = require("path");

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

//When admin submit the add project form
router.post("/add",(req,res)=>
{
    const newProject = {
        projectTitle : req.body.projectTitle,
        projectCategory : req.body.projectCategory,
        projectType : req.body.projectType,
        projectToolsAndTechnology : req.body.projectToolsAndTechnology,
        projectDescription : req.body.projectDescription,
        projectImage : req.body.projectImage
    }

    const project =  new projectModel(newProject);
    project.save()
    .then((project)=>{

        req.files.projectImage.name = `project_${project._id}${path.parse(req.files.projectImage.name).ext}`;
        
        req.files.projectImage.mv(`public/img/uploads/${req.files.projectImage.name}`)
        .then(()=>{
            
            projectModel.updateOne({_id:project._id},{
                projectImage: req.files.projectImage.name
            })
            .then(()=>{
                res.redirect("/project/manage")
            })
            
        })

    })
    .catch(err=>console.log(`Error occured while inserting data:${err}`));
});

//Project Manage Route
router.get("/manage",(req,res)=>{

    res.render("projects/projectDashboard",{
        title: "Project Manage Page",
        description: "Welcome to project dashboard page."
    })

});


module.exports = router;
const express = require('express')
const router = express.Router();
//Importing models data
const projectModel = require("../models/Project");
const path = require("path");
const isAuthenticated = require("../middleware/auth");

//Setting up routes
//Portfolio View Route
router.get("/list",(req,res)=>{

    res.render("projects/projectList",{
        title: "Portfolio Page",
        description: "Welcome to portfolio page."
    })

});

//Project Add Route
router.get("/add",isAuthenticated,(req,res)=>{

    res.render("projects/projectAdd",{
        title: "Project Add Page",
        description: "Welcome to project add page."
    })

});

//When admin submit the add project form
router.post("/add",isAuthenticated,(req,res)=>
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
                res.redirect("/project/dashboard")
            })
            
        })

    })
    .catch(err=>console.log(`Error occured while inserting data:${err}`));
});

//Project Dashboard Route
router.get("/dashboard",isAuthenticated,(req,res)=>{

    projectModel.find()
    .then((projects)=>{

        const filteredProject =   projects.map(project=>{
            return {
                id: project._id,
                projectTitle : project.projectTitle,
                projectCategory : project.projectCategory,
                projectType : project.projectType,
                projectToolsAndTechnology : project.projectToolsAndTechnology,
                projectDescription : project.projectDescription,
                projectImage : project.projectImage
            }
        });

        res.render("projects/projectDashboard",{
            title: "Project Dashboard Page",
            description: "Welcome to project dashboard page.",
            data : filteredProject
        })

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));
});

//Project Edit Route
router.get("/edit/:id",isAuthenticated,(req,res)=>{

    projectModel.findById(req.params.id)
    .then((project)=>{

        const {_id,projectTitle,projectCategory,projectType,projectToolsAndTechnology,projectDescription,projectImage} = project;
        res.render("projects/projectEdit",{
            title: "Project Edit Page",
            description: "Welcome to project edit page.",
            _id,
            projectTitle,
            projectCategory,
            projectType,
            projectToolsAndTechnology,
            projectDescription,
            projectImage
        })

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));
})

//Project Update Route
router.put("/update/:id",isAuthenticated,(req,res)=>{

    const project = {
        projectTitle : req.body.projectTitle,
        projectCategory : req.body.projectCategory,
        projectType : req.body.projectType,
        projectToolsAndTechnology : req.body.projectToolsAndTechnology,
        projectDescription : req.body.projectDescription,
        projectImage : req.body.projectImage
    }

    projectModel.updateOne({_id:req.params.id},project)
    .then(()=>{
        res.redirect("/project/dashboard");
    })
    .catch(err=>console.log(`Error occured while updating data :${err}`));


});

//Project Delete Route
router.delete("/delete/:id",isAuthenticated,(req,res)=>{
    
    projectModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/project/dashboard");
    })
    .catch(err=>console.log(`Error occured while deleting data :${err}`));

});


module.exports = router;
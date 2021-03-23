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
            title: "Project Manage Page",
            description: "Welcome to project dashboard page.",
            data : filteredProject
        })

    })
    .catch(err=>console.log(`Error occured while pulling data :${err}`));
});

//Project Edit Route
router.get("/edit/:id",(req,res)=>{

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
router.put("/update/:id",(req,res)=>{

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
        res.redirect("/project/manage");
    })
    .catch(err=>console.log(`Error occured while updating data :${err}`));


});

//Project Delete Route
router.delete("/delete/:id",(req,res)=>{
    
    projectModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/project/manage");
    })
    .catch(err=>console.log(`Error occured while deleting data :${err}`));

});


module.exports = router;
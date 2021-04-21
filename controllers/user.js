const express = require('express')
const router = express.Router();
//Importing models data
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

//Setting up routes
router.get("/login",(req,res)=>{
    res.render("user/login",{
        title: "Bijaya Gautam | Login",
        description : "User login Page"
    })
});

router.post("/login",(req,res)=>
{
    const errors= {};
    const {emailAddress,password} = req.body;

    if((emailAddress=="") || (emailAddress== null))
    {
        errors.emailAddress="Please enter your email address.";
    }

    if((password=="") || (password== null))
    {
        errors.password="Please enter your password.";
    }

    if(Object.keys(errors).length > 0)
    {
        //Object.keys() method returns an array of a errors object's 
        console.log(Object.keys(errors));
        res.render("user/login",{
            title: "Bijaya Gautam | Login",
            description : "User login Page",
            messages : errors,
            data: {...req.body }
        })
    }
    else
    {
        userModel.findOne({emailAddress:req.body.emailAddress })
        .then(user=>{
            const errors=[];

            //Email not found
            if(user==null)
            {
                errors.push(`Sorry, your email and/or password is incorrect.`);
                res.render("user/login",{
                    errors
                })
            }
            //Email found
            else
            {
                bcrypt.compare(req.body.password, user.password)
                .then(isMatched=>{

                    if(isMatched)
                    {
                        //session created here
                        req.session.userInfo = user;
                        res.redirect("/project/dashboard")
                    }
                    else
                    {
                        errors.push(`Sorry, your email and/or password is incorrect. `);
                        res.render("user/login",{
                            errors
                        }) 
                    }
                })
                .catch(err=>console.log(`Error ${err}`));
            }
        })
        .catch(err=>console.log(`Error ${err}`));
    }
});

router.get("/logout",(req,res)=>{

    req.session.destroy();
    res.redirect("/user/login")

});


module.exports = router;
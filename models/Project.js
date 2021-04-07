const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    
    projectTitle:
    {
        type:String,
        required:true
    },
    projectCategory:
    {
        type:String,
        required:true
    },
    projectType:
    {
        type:String,
        required:true
    },
    projectToolsAndTechnology:
    {
        type:String,
        required:true
    },
    projectDescription:
    {
        type:String,
        required:true
    },
    projectImage:
    {
        type:String
    },
    projectLink:
    {
        type:String
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
});

// for every schema we need to create a schema per collection,
// we must create a model object,
// model will allow to perform CRUD operations on a given collection

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;
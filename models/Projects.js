var mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log(mongoose.connection.readyState);  
ProjectsSchema = new Schema({
name:String,
description:String,
github_url:String,
deploy_url:String,
team_mates:String
});
var Projects = mongoose.model('Projects', ProjectsSchema);
module.exports = Projects;

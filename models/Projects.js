var mongoose = require('mongoose');
var Schema = mongoose.Schema;
console.log(mongoose.connection.readyState);
var Person=require('./Person');
ProjectsSchema = new Schema({
name:String,
description:String,
github_url:String,
deploy_url:String,
team_mates:[{type:Schema.Types.ObjectId, ref:'Person'}],
screenshots:[String]
});
var Projects = mongoose.model('Projects', ProjectsSchema);
module.exports = Projects;

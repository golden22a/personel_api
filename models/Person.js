var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PersonSchema = new Schema({
name:String,
github_url:String
});
var Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

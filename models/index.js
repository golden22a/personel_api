var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_qpvvvl2g:1po22oj3dv2bt0gg9601v56ejo@ds215388.mlab.com:15388/heroku_qpvvvl2g', {promiseLibrary: global.Promise});
/* adding model Projects to index.js */
var Projects = require('./Projects');
module.exports.Projects = Projects
/* adding model Person to index.js */
module.exports.Person = require('./Person');

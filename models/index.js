var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/personel_api', {promiseLibrary: global.Promise});

var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect('mongodb://localhost/personel_api', {promiseLibrary: global.Promise});


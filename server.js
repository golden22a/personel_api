var express=require('express');
var app=express();
var db=require('./models/index.js');
var bodyParser = require('body-parser');

// Configure app
app.set('views', __dirname + '/views');      // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body

// Set CORS Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//basic root route
app.get('/',function(res,req){
  req.json({"message":"hey this route doesn't exist try /api x)"});
});
app.get('/api',function(req,res){
res.json({
  "documentation_url":"https://github.com/golden22a/personel_api",
  "base_url":"https://cryptic-reef-80005.herokuapp.com/",
  "_endpoints":[
    {
      "method":"GET",
      "path":"/api",
      "description":"describe all availabe endpoints"

    },
    {
      "method":"GET",
      "path":"/api/profile",
      "description":"gives you more informatiton about who i am and where i am from"
    },
    {
      "method":"GET",
      "path":"/api/projects",
      "descriptions":"information about my previous projects"
    },
    {
    "method":"POST",
    "path":"/api/projects",
    "description":"create a new project"
  },
  {
    "method":"GET",
    "path":"api/projects/:project_id",
    "description":"show more information about a single project"
  },
  {
    "method":"PUT",
    "path":"/api/porjects/:project_id",
    "description":"update a single project"
  },
  {
    "method":"DELETE",
    "path":"/api/projects/:project_id",
    "description":"delete a single project"
  }

]
});
  });
  app.get('/api/projects',function(req,res){
    projects=db.Projects.find({},function(err,all){
      if(err){
        res.json("message":"ops");
        throw err;
      }else{
    res.json(all);
  }
    });
  });



app.listen(process.env.PORT || 3000,function(){
  console.log('server running');
});

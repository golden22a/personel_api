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
    db.Projects.find()
    .populate('team_mates')
    .exec(function(err,all){
      if(err){
        res.status(500).json(err);

      }else{

    res.status(200).json({"projects":all});
  }
    });
  });
  app.post('/api/projects',function(req,res){
    console.log(req.body.name);
    var name=req.body.name || '';
    var description=req.body.description || '';
    var github_url=req.body.github_url || '';
    var deploy_url=req.body.deploy_url || 'Not deployed yet';
    var team_mates=req.body.team_mates || 'Individual project';
    var screenshots=req.body.screenshots || '';
    if(name == '' || description == '' || github_url == ''){
      res.status(500).json({'message':'you need to specifie name,description and the github url'});
    }
    else{
      db.Projects.create({"name":name,"description":description,"github_url":github_url,"deploy_url":deploy_url,"team_mates":team_mates,"screenshot":screenshots},function(err,added){
        if(err){
          res.status(500).json(err);
        }else{

      res.status(200).json({"project_added":added});
      }
    });
  }

  });
  app.get('/api/projects/:project_id',function(req,res){
    var id=req.params.project_id;
    db.Projects.findById(id,function(err,project){
      if(err){
        res.status(500).json({"project":"project not found "});
      }else{

    res.status(200).json({"project":project});
    }
    });
  });
  app.put('/api/projects/:project_id',function(req,res){
    var id=req.params.project_id;
    db.Projects.findById(id,function(err,project){
      if(err){
        res.status(500).json({"project":"project not found "});
      }else{
       project.name=req.body.name || project.name;
         project.describtion=req.body.description || project.describtion;
        project.github_url=req.body.github_url || project.github_url;
        project.deploy_url=req.body.deploy_url || project.deploy_url;
        project.team_mates=req.body.team_mates || project.team_mates;
        project.screenshots=req.body.screenshots || project.screenshots;
        project.save(function(err,saved){
          if(err){
            res.status(500).json({"project":"project couldn't be saved "});
          }else{
          res.status(200).json({"project":project});
        }
      });

    }
    });
  });
  app.delete('/api/projects/:project_id',function(req,res){
    var id=req.params.project_id;
    console.log(id);
    db.Projects.findById(id,function(err,project){
      if(err){
        console.log(err);
        res.status(500).json({"project":"project not found "});
      }else{
        project.remove(function(err,deleted){
          if(err){
            res.status(500).json({"project":"project couldn't be deleted "});
          }else{
          res.status(200).json({"deleted":project});
        }
      });
  }
});
});

app.get('/api/profile',function(req,res){
res.status(200).json({"name":"Abdelhalim Khaldi",
"githubUsername":"golden22a",
"githubLink":"https://github.com/golden22a",
"personalSiteLink":"golden22a.github.io",
"currentCity":"San Francisco",
"things_i_love":[
  {
    "name":"chocolate",
    "description":"just chocolate"
  },{
    "name":"traveling",
    "description":"i love to travel"
  },{
    "name":"Dj",
    "description":"I hate DJ"
  }
]

})
});

app.listen(process.env.PORT || 3000,function(){
  console.log('server running');
});

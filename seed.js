var db=require('./models/index.js');
var Faker=require('faker');
var persons=[{name:'dj',github_url:'https://github.com/Dereje24'},{name:'Lisa',github_url:'https://github.com/CaliGRITS'},{name:'Terrel',github_url:'https://github.com/t-tullis'}]
db.Person.remove({});
db.Person.create(persons,function(err,all){
  if(err){
    console.log(err)
  }else{
    console.log(all.length);
    db.Projects.create({
      'name':'ScootWee',
      'description':'Rental app for scooter based developed on Ruby on rails',
      'github_url':'https://github.com/SF-WDI/project1-scootwee',
      'deploy_url':'https://dry-atoll-70746.herokuapp.com/',
      'team_mates':all,
      'screenshots':['']
    },function(err,done){
      if(err){
        console.log(err);
        throw err;
      }
      console.log(done);
    });
  }
});
db.Projects.remove({});
for(var i=0;i<5;i++){
  db.Projects.create({
    'name':Faker.name.findName(),
    'description':Faker.name.jobDescriptor(),
    'github_url':Faker.internet.url(),
    'deploy_url':Faker.internet.url(),
    'team_mates':[null],
    'screenshots':[Faker.image.imageUrl(),Faker.image.imageUrl(),Faker.image.imageUrl()]
  },function(err,done){
    if(err){
      console.log(err);
      throw err;
    }
    console.log(done);
  });
}

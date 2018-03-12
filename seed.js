var db=require('./models/index.js');
var Faker=require('faker');
db.Projects.remove({});
for(var i=0;i<10;i++){
  db.Projects.create({
    'name':Faker.name.findName(),
    'description':Faker.name.jobDescriptor(),
    'github_url':Faker.internet.url(),
    'deploy_url':Faker.internet.url(),
    'team_mates':[Faker.name.findName(),Faker.name.findName(),Faker.name.findName()]
  },function(err,done){
    if(err){
      console.log(err);
      throw err;
    }
    console.log(done);
  });
}

process.exit(1);

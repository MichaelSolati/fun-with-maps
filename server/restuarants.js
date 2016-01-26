Meteor.startup(function() {
  let fs = Meteor.npmRequire('fs');
  let jsonfile = Meteor.npmRequire('jsonfile');
  let util = Meteor.npmRequire('util');

  if (Restaurants.find().count() === 0) {
    let restaurants = jsonfile.readFileSync(process.env.PWD + '/public/restaurants.json');
    for (var restaurant in restaurants) {
      try{
        Async.runSync(function(done) {
          if ((restaurants[restaurant]['address']['coord']).length !== 0){
            restaurants[restaurant]['address']['type'] = "Point";
            restaurants[restaurant]['address']['coordinates'] = restaurants[restaurant]['address']['coord'];
          } else {
            restaurants[restaurant]['address']['type'] = "Point";
            restaurants[restaurant]['address']['coordinates'] = [0,0];
          };
          delete restaurants[restaurant]['address']['coord'];
          Restaurants.insert(restaurants[restaurant]);
          done(null);
        });
      }catch(e){
        console.log("Here is the exception : "+e.message);
      }
    }
  };
});

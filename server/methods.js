Meteor.methods({
  'geocode': function() {
    Restaurants._ensureIndex({
      'address': "2dsphere"
    });
    console.log("Created a 2dsphere Index.")
  },
  'restaurantsList': function(lat, lng) {
    var restaurants = Restaurants.find({
      address: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 80
        }
      }
    }).fetch();
    var destinations = [];
    for (var i in restaurants) {
      destinations.push(restaurants[i].address.coordinates[1] + "," + restaurants[i].address.coordinates[0]);
    }
    destinations = destinations.join("|");
    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+lat + "," + lng+"&destinations="+destinations+"&mode=walking&units=imperial&key=INSERTKEYHERE"
    console.log(url);
    var request = Meteor.npmRequire('request');
    Future = Npm.require('fibers/future');
    var restaurantFuture = new Future();
    request({
      url: url,
      json: true
    }, function(error, response, body) {
      var json = JSON.stringify(body);
      json = JSON.parse(json);
      for (var o in restaurants) {
        restaurants[o]['distance'] = json.rows[0].elements[o].distance.text;
        restaurants[o]['duration'] = json.rows[0].elements[o].duration.text;
      }
      console.log(restaurants);
      restaurantFuture.return(restaurants);
    })
    return restaurantFuture.wait();
  }
});

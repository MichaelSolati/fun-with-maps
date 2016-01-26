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
    return restaurants;
  }
});

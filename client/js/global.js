if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    Session.set("lat", position.coords["latitude"]);
    Session.set("lng", position.coords["longitude"]);
  },
  function(error) {
    console.log("Error: ", error);
  },
  {
    enableHighAccuracy: true
  });
}

Meteor.subscribe("restaurants");

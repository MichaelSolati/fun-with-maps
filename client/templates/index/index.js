Template.index.onCreated(function() {
  Meteor.call('geocode');
});

Template.index.onRendered(function() {
  googleMaps.initialize();

  Deps.autorun(function(){
    if (Session.get("lat") != null && Session.get("lng") != null) {
      googleMaps.findMe();
    }
  });

  var prev_infoWindow = false;

  Deps.autorun(function(){
    if (Session.get("lat") != null && Session.get("lng") != null) {
      googleMaps.clearMarkers()
      Meteor.call('restaurantsList', Session.get("lat"), Session.get("lng"), function(error, result){
        if(error){
          console.log(error);
        } else {
          var restaurants = result;
          _.each(restaurants, function(restaurant) {
            var contentString = '<div>'+
            '<h1>'+restaurant.name+'</h1>'+
            '<h3>'+restaurant.cuisine+'</h3>'+
            '<p>'+restaurant.address.building+' '+restaurant.address.street+', '+restaurant.borough+'</p>'+
            '</div>';
            var infoWindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 300
            });

            var objMarker = {
              id: restaurant._id,
              lat: restaurant.address.coordinates[1],
              lng: restaurant.address.coordinates[0],
              title: restaurant.name,
              infoWindow: infoWindow
            }

            // check if marker already exists
            if (!googleMaps.markerExists('id', objMarker.id)) {
              var i = googleMaps.addMarker(objMarker);
              google.maps.event.addListener(i, 'click', function() {
                if (prev_infoWindow) {
                  prev_infoWindow.close();
                }
                prev_infoWindow = infoWindow;
                googleMaps.map.panTo(i.getPosition());
                infoWindow.open(googleMaps.map, i);
              });
            }
          });
        }
      });
    }
  });
});

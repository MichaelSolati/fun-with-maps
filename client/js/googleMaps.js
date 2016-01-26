googleMaps = {
  map: null,
  youAreHere: null,
  initialize: function() {
    // My Favorite Coffee Shop In New Haven
    var currentLocation = new google.maps.LatLng(41.3047960, -72.9234220);
    var mapOptions = {
      zoom: 18,
      center: currentLocation
    };
    this.map = new google.maps.Map(
      document.getElementById('map'),
      mapOptions
    );
    youAreHere = new google.maps.Marker({
      position: currentLocation,
      title:"You Are Here!",
      icon: "/bluedot.png"
    });
    youAreHere.setMap(this.map);
  }
}

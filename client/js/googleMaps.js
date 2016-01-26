googleMaps = {
  map: null,
  youAreHere: null,
  markers: [],
  latLngs: [],
  markerData: [],
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
  },
  findMe: function() {
    youAreHere.setMap(null);
    var currentLocation = new google.maps.LatLng(Session.get("lat"), Session.get("lng"));
    this.map.panTo(currentLocation);
    this.map.setZoom(18);
    youAreHere = new google.maps.Marker({
      position: currentLocation,
      title:"You Are Here!",
      icon: "/bluedot.png"
    });
    youAreHere.setMap(this.map);
  },
  addMarker: function(marker) {
    var gLatLng = new google.maps.LatLng(marker.lat, marker.lng);
    var gMarker = new google.maps.Marker({
      position: gLatLng,
      map: this.map,
      title: marker.title,
      infoWindow: marker.infoWindow
    });
    this.latLngs.push(gLatLng);
    this.markers.push(gMarker);
    this.markerData.push(marker);
    return gMarker;
  },
  markerExists: function(key, val) {
    _.each(this.markers, function(storedMarker) {
      if (storedMarker[key] == val)
      return true;
    });
    return false;
  },
}

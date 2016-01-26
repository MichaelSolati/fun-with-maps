Template.index.onRendered(function() {
  googleMaps.initialize();

  Deps.autorun(function(){
    if (Session.get("lat") != null && Session.get("lng") != null) {
      googleMaps.findMe();
    }
  });
});

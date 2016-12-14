//= require ./utils/handlebars-helpers

window.draw = function(markersData, mapId) {
  var mapOptions = {
    center: new google.maps.LatLng(54.710303, 20.510784),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    styles: window.MAP_STYLES
  };

  var map = new google.maps.Map(document.getElementById(mapId), mapOptions);

  var infowindow = new google.maps.InfoWindow();

  var source = $('#map-popover').html();
  var popoverTemplate = Handlebars.compile(source);

  if (markersData) {
    markersData.forEach(function(markerData, index) {
      if (markerData.lat === undefined || markerData.lon === undefined) { return }

      var popoverContent = popoverTemplate({
        title: markerData.name,
        address: markerData.address,
        url: markerData.url,
        description: markerData.name,
        pic_url: markerData.pic_url
      });

      console.log (popoverContent)

      var markerParams = {
        map: map,
        position: new google.maps.LatLng(markerData.lat, markerData.lon),
        icon: window.MARKER_ICONS[markerData.type]
      };


      var marker = new google.maps.Marker(markerParams);

      marker.addListener('click', function() {
        infowindow.setContent(popoverContent);
        infowindow.open(map, marker);
      });
    })
  }
};

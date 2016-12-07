//  TODO зарефакторить тут все

(function(window) {

  var POPUP_TEMPLATE_ID = "popup_internals_template";
  var POPUP_HOLDER_ID = "map-popup";
  var POPUP_CLOSE_BUTTON_SELECTOR = ".close";
  var REPLACE_ME_SELECTOR = ".replace-me";
  var MAP_HOLDER_ID = "map-holder";
  var UI_MAP_ICON_SELECTOR = "#map-icons a";
  var UI_ICON_ACTIVE_CLASS = "cur";

  var MOBILE_PLACE_TEMPLATE_ID = "place_template";
  var MOBILE_PLACE_HOLDER_ID = "places_holder";

  window.MAP_STYLES = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#e1000a"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  window.MARKER_ICONS = {
    'bar': '/images/ico/mark-b.png',
    'cinema': '/images/ico/mark-c.png',
    'food': '/images/ico/mark-f.png',
    'event': '/images/ico/mark-k.png',
    'site': '/images/ico/mark-m.png',
    'hotel': '/images/ico/mark-h.png'
  }

  window.loadMarkers = function() {
    bindUIMapIcons();
    return $.getJSON(window.URI.markersPath(window.locale));
  }

  var _markersByTypes;
  var _map;
  window.drawMarkers = function(markersData) {
    var mapOptions = {
      center: new google.maps.LatLng(54.710303, 20.510784),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      disableDefaultUI: true,
      styles: window.MAP_STYLES
    };

    _map = new google.maps.Map(document.getElementById(MAP_HOLDER_ID),
      mapOptions);

    _markersByTypes = {};
    if (markersData) {
      $.each(markersData, function(ix, markerData) {
        var markerParams = {};
        if (markerData.lat === undefined || markerData.lon === undefined) {
          return;
        }
        markerParams.map = _map;
        markerParams.position = new google.maps.LatLng(
          markerData.lat,
          markerData.lon
        );
        if (markerData.type !== undefined && window.MARKER_ICONS[markerData.type] !== undefined) {
          if (markerData.url.match(/hotelmoskva/)) {
            markerParams.icon = new google.maps.MarkerImage(
              window.MARKER_ICONS[markerData.type],
              undefined,
              undefined,
              undefined,
              new google.maps.Size(36, 66)
            )
          } else {
            markerParams.icon = window.MARKER_ICONS[markerData.type];
          }
        }
        var marker = new google.maps.Marker(markerParams);
        if (markerData.id !== undefined) {
          google.maps.event.addListener(marker, 'click', function() {
            showMapMarkerPopup(markerData.id)
          });
        }
        _markersByTypes[markerData.type] = _markersByTypes[markerData.type] || [];
        _markersByTypes[markerData.type].push(marker);
      });
    }
  }

  window.drawMobileMarkers = function(markerData) {
    var placeTmpl = Handlebars.compile($('#' + MOBILE_PLACE_TEMPLATE_ID).html());
    var placesHolder = $('#' + MOBILE_PLACE_HOLDER_ID);
    $.each(markerData, function(_, markerObj) {
      placesHolder.append(placeTmpl(markerObj));
    });
  }

  window.loadMapMarkerData = function(markerId) {
    return $.getJSON(URI.markerPath(window.locale, markerId));
  }

  var _popupTemplate;
  var _popupHolder;
  var _checkPopupElement = function() {
    _popupTemplate = _popupTemplate ||
      Handlebars.compile($("#" + POPUP_TEMPLATE_ID).html());
    _popupHolder = _popupHolder || $("#" + POPUP_HOLDER_ID);
    _popupHolder.delegate(POPUP_CLOSE_BUTTON_SELECTOR, 'click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      _popupHolder.fadeOut();
    })
  }

  window.redrawMapMarkerPopup = function(markerData) {
    _checkPopupElement();
    _popupHolder.find(REPLACE_ME_SELECTOR).html(_popupTemplate(markerData));
  }

  var _prevMarkerId;
  window.showMapMarkerPopup = function(markerId) {
    if (_prevMarkerId == markerId && _popupHolder) {
      _popupHolder.fadeIn();
    } else {
      _checkPopupElement();
      loadMapMarkerData(markerId).done(function(markerData) {
        redrawMapMarkerPopup(markerData);
        _popupHolder.fadeIn();
      });
    }
  }

  window.hideMapMarkerPopup = function() {
    if (_popupHolder) {
      _popupHolder.fadeOut();
    }
  }

  var bindUIMapIcons = function() {
    var uiIcons = $(UI_MAP_ICON_SELECTOR);
    uiIcons.click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $this = $(this)
      if ($this.filter('.' + UI_ICON_ACTIVE_CLASS).length) {
        $this.removeClass(UI_ICON_ACTIVE_CLASS);
        for (var key in _markersByTypes) if (_markersByTypes.hasOwnProperty(key)) {
          $.each(_markersByTypes[key], function(ix, marker) {
            marker.setMap(_map);
          });
        }
      } else {
        uiIcons.removeClass(UI_ICON_ACTIVE_CLASS);
        $this.addClass(UI_ICON_ACTIVE_CLASS);
        type = $this.attr('type');
        for (var key in _markersByTypes) if (_markersByTypes.hasOwnProperty(key)) {
          if (key == type) {
            $.each(_markersByTypes[key], function(ix, marker) {
              marker.setMap(_map);
            });
          } else {
            $.each(_markersByTypes[key], function(ix, marker) {
              marker.setMap(null);
            });
          }
        }
      }
    });
  }

})(window);

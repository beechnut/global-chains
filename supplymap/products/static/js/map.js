// Map Initialization

var INIT_LNG = 0,
    INIT_LAT = 0,
    INIT_ZUM = 2;

var map = L.map('map').setView([INIT_LNG, INIT_LAT], INIT_ZUM)

L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
  key: 'd4fc77ea4a63471cab2423e66626cbb6',
  attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  styleId: 22677
}).addTo(map);


var waypoint_layer, transport_layer;

$('.product').on('click', function(){
  var id = $(this).data('chain')
  $('.product').css('background-color', '#09F')
  $(this).css('background-color', '#3AF')
  console.log(id);

  $.getJSON('get_supply_chain/' + id, function(data){
    data.supply_chains.forEach(function(supply_chain, ind, arr){
      console.log(supply_chain);

      if (map.hasLayer(waypoint_layer)){
        map.removeLayer(waypoint_layer);
      }

      if (map.hasLayer(transport_layer)){
        map.removeLayer(transport_layer);
      }
      
      console.log(supply_chain.waypoints);
      console.log(supply_chain.transports);

      waypoint_layer = L.geoJson(supply_chain.waypoints, {
        style: styleMarkers,
        pointToLayer: pointToWaypointLayer,
        onEachFeature: onEachWaypoint
      });

      transport_layer = L.geoJson(supply_chain.transports, {
        style: styleLines,
        onEachFeature: onEachTransport
      });

      map.addLayer(waypoint_layer);
      map.addLayer(transport_layer);
    });
  });
});



// Style Setup

BORDER_COLOR = '#FFF'

var dota_colors = {
  "dark_blue":  '#031926',
  "mid_blue":   '#083A59',
  "light_blue": '#085A8C',
  "light_red":  '#BF452A',
  "dark_red":   '#A63429',
}

var facility_icons = {
  'rmsp': 'leaf',                         // Raw Material Supplier
  'manu': 'cog', // gears                 // Manufacturer
  'stor': 'building',                     // Storage Facility
  'dist': 'globe',                        // Distributor
  'retl': 'signout', //credit-card, money // Retailer
  'cons': 'home'                          // Consumer
}

var facility_names = {
  'rmsp': 'Raw Material Supplier',
  'manu': 'Manufacturer',
  'stor': 'Storage Facility',
  'dist': 'Distributor',
  'retl': 'Retailer',
  'cons': 'Consumer'
}


// Style Functions

function getCarbonColor(carbon) {
  return '#888';
  // var c = carbon;
  // return c > 1000 ? 'red' :
  //        c > 500  ? 'darkred' :
  //        c > 100  ? 'purple' :
  //        c > 20   ? 'blue' :
  //                   'darkblue' ;
}

function getWageColor(wage) {
  return 'blue';
  // var w = wage;
  // return w >  200 ? 'darkblue' :
  //        w >  50  ? 'blue' :
  //        w >  10  ? 'purple' :
  //        w >  2   ? 'red' :
  //        w >= 1   ? 'dark_red' :
  //                   '#DDD';
}

function styleMarkers(feature){
  return {
    radius: 8,
    fillColor: getWageColor(feature.properties.worker_wage),
    weight: 2,
    opacity: 1,
    color: BORDER_COLOR,
    fillOpacity: 1
  };
}

function styleLines(feature) {
  return {
    color: getCarbonColor(feature.properties.carbon_output),
    weight: 4,
    opacity: 0.9
  };
}



// Waypoints Functions

function pointToWaypointLayer(feature, latlng) {
  var marker = L.AwesomeMarkers.icon({
    icon: facility_icons[feature.properties.waypoint_type],
    color: getWageColor(feature.properties.worker_wage)
  });
  return L.marker(latlng, {icon: marker});
}

function onEachWaypoint(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.waypoint_type) {
    var facility_code = feature.properties.waypoint_type
    layer.bindPopup(facility_names[facility_code]);
  }
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}

// Transports Functions

function onEachTransport(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.carbon_output) {
    var carbon_info = "Emits " + feature.properties.carbon_output + " tons CO2"
    layer.bindPopup(carbon_info);
  }
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
  });
}


// Data Inspect Preparation

function highlightFeature(e) {
  var layer = e.target;

  // layer.setStyle({
  //   weight: 5,
  //   color: '#666',
  //   dashArray: '',
  //   fillOpacity: 0.7
  // });

  // if(!L.Browser.ie && !L.Browser.opera){
  //   layer.bringToFront();
  // }
  info.update(layer.feature.properties); // to update control / data inspector
}

function resetHighlight(e) {
  // geojson.resetStyle(e.target);
  info.update();
}


// Data Inspector

var info = L.control();

info.onAdd = function(map){
  this._div = L.DomUtil.create('div', 'info'); // create a div with class "info"
  this.update();
  return this._div;
};

var HEADER_HTML = '<h4>Data Inspector</h4>'

info.update = function(props) {
  this._div.innerHTML = HEADER_HTML + (props ? '<b>Emits ' + props.carbon_output + ' tons CO2</b><br /> $' + props.worker_wage + ' / day' : 'Hover over a waypoint<br/>or transport route.');
}

info.addTo(map);
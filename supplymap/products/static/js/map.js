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

var waypoints_zero = data.supply_chains[0].waypoints
var transports_zero = data.supply_chains[0].transports

var waypoints_one = data.supply_chains[1].waypoints
var transports_one = data.supply_chains[1].transports


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
  'Raw Material Supplier': 'leaf',
  'Manufacturer': 'cog', // gears
  'Storage Facility': 'building', 
  'Distributor': 'globe',
  'Retailer': 'signout', //credit-card, money
  'Consumer': 'home'
}



// Style Functions

function getCarbonColor(carbon) {
  var c = carbon;
  return c > 1000 ? 'red' :
         c > 500  ? 'darkred' :
         c > 100  ? 'purple' :
         c > 20   ? 'blue' :
                    'darkblue' ;
}

function getWageColor(wage) {
  var w = wage;
  return w >  200 ? 'darkblue' :
         w >  50  ? 'blue' :
         w >  10  ? 'purple' :
         w >  2   ? 'red' :
         w >= 1   ? 'dark_red' :
                    '#DDD';
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



// Waypoints

function pointToWaypointLayer(feature, latlng) {
  var marker = L.AwesomeMarkers.icon({
    icon: facility_icons[feature.properties.waypoint_type],
    color: getWageColor(feature.properties.worker_wage)
  });
  return L.marker(latlng, {icon: marker});
}

function onEachWaypoint(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.worker_wage) {
    var wage_info = "$" + feature.properties.worker_wage + "/day"
    layer.bindPopup(wage_info);
  }
}

L.geoJson(waypoints_zero, {
  style: styleMarkers,
  pointToLayer: pointToWaypointLayer,
  onEachFeature: onEachWaypoint
}).addTo(map);

L.geoJson(waypoints_one, {
  style: styleMarkers,
  pointToLayer: pointToWaypointLayer,
  onEachFeature: onEachWaypoint
}).addTo(map);



// Transports

function onEachTransport(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.carbon_output) {
    var carbon_info = "Emits " + feature.properties.carbon_output + " tons CO2"
    layer.bindPopup(carbon_info);
  }
}

L.geoJson(transports_zero, {
  style: styleLines,
  onEachFeature: onEachTransport
}).addTo(map);

L.geoJson(transports_one, {
  style: styleLines,
  onEachFeature: onEachTransport
}).addTo(map);

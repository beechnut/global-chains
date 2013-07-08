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

var waypoint_layer, transport_layer, topic, id;

function updateMap(id, should_fit){
  $.getJSON('get_supply_chain/' + id, function(data){
    data.supply_chains.forEach(function(supply_chain, ind, arr){

      if (map.hasLayer(waypoint_layer)){
        map.removeLayer(waypoint_layer);
      }

      if (map.hasLayer(transport_layer)){
        map.removeLayer(transport_layer);
      }

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
      if(should_fit){
        map.fitBounds(waypoint_layer);
      }
    });
  });  
}

// Exploration Topics
// Clicking on topic updates map

$('.topic').on('click', function(){
  topic = $(this).data('topic');
  $('.topic').css('background-color', '#09F');
  $(this).css('background-color', '#3AF');
  updateMap(id, false);
});


// Clicking on products updates map

$('.product').on('click', function(){
  id = $(this).data('chain')
  $('.product').css('background-color', '#09F')
  $(this).css('background-color', '#3AF')
  console.log("supply chain: ", id);
  console.log(topic);

  updateMap(id, true);
});

$('#sidebar .product')[0].click();
$('#sidebar .topic')[0].click();

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
function getTopicColor(topic, param) {
  return eval("get" + topic + "Color" )(param);
}

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
                    '#D09';
}

function styleMarkers(feature){
  return {
    radius: 8,
    fillColor: getTopicColor(topic, feature.properties.worker_wage),
    weight: 2,
    opacity: 1,
    color: BORDER_COLOR,
    fillOpacity: 1
  };
}

function styleLines(feature) {
  return {
    color: getTopicColor(topic, feature.properties.carbon_output),
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
  info.update(layer.feature.properties); // to update control / data inspector
}

function resetHighlight(e) {
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
var DEFAULT_HTML = 'Hover over a waypoint or transportation route.'

info.update = function(props) {
  inspector_html = DEFAULT_HTML;
  if(props){
    inspector_html = (props.waypoint_type ? '<b>' + facility_names[props.waypoint_type] + '</b><br/>' : 'Transportation<br/>');
    inspector_html += (props.company_name && props.company_name != 'Consumer' ? props.company_name + '<br/>' : 'No company data.<br/>');
    inspector_html += (props.carbon_output ? 'Emits ' + props.carbon_output + ' tons CO2<br/>' : 'No carbon data.<br/>');
    inspector_html += (props.worker_wage ? 'Worker makes $' + props.worker_wage + ' / day' : 'No wage data.');
  }
  this._div.innerHTML = HEADER_HTML + inspector_html;
}

info.addTo(map);
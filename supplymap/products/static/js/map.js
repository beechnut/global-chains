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
  updateLegend(topic);
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

var property_names = {
  'Wage': 'worker_wage',
  'Carbon': 'carbon_output'
}


// Style Functions
function getTopicColor(topic, feature) {
  property = eval("feature.properties." + property_names[topic])
  return eval("get" + topic + "Color" )(property);
}

function getCarbonColor(carbon) {
  var c = carbon;
  return c > 1000 ? 'red' :
         c > 500  ? 'darkred' :
         c > 30   ? 'orange' :
         c > 2    ? 'darkgreen' :
                    'green' ;
}

function getWageColor(wage) {
  var w = wage;
  return w >  50  ? 'green' :
         w >  20  ? 'darkgreen' :
         w >  5   ? 'orange' :
         w >  2   ? 'darkred' :
                    'red';
}

function styleMarkers(feature){
  return {
    radius: 8,
    fillColor: getTopicColor(topic, feature),
    weight: 2,
    opacity: 1,
    color: BORDER_COLOR,
    fillOpacity: 1
  };
}

function styleLines(feature) {
  return {
    color: getTopicColor(topic, feature),
    weight: 4,
    opacity: 0.9
  };
}



// Waypoints Functions

function pointToWaypointLayer(feature, latlng) {
  var marker = L.AwesomeMarkers.icon({
    icon: facility_icons[feature.properties.waypoint_type],
    color: getTopicColor(topic, feature)
  });
  return L.marker(latlng, {icon: marker});
}

function onEachWaypoint(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.waypoint_type) {
    var facility_code = feature.properties.waypoint_type
    layer.bindPopup("<b>" + facility_names[facility_code] + "</b><br/>" + feature.properties.company_name);
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
    var carbon_info = "Emits " + feature.properties.carbon_output + " kg CO2<br/>during transportation"
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

var HEADER_HTML = '<h4>Data Inspector</h4><hr/>'
var DEFAULT_HTML = 'Hover over a waypoint or transportation route.'

info.update = function(props) {
  inspector_html = DEFAULT_HTML;
  if(props){
    inspector_html = (props.waypoint_type ? '<b>' + facility_names[props.waypoint_type] + '</b><br/>' : 'Transportation<br/>');
    inspector_html += (props.company_name && props.company_name != 'Consumer' ? props.company_name + '<br/>' : 'No company data.<br/>');
    inspector_html += "<br/>"
    inspector_html += (props.carbon_output ? 'Emits ' + props.carbon_output + ' kg CO2<br/>' : 'No carbon data.<br/>');
    inspector_html += (props.worker_wage ? 'Worker makes $' + props.worker_wage + ' / day' : 'No wage data.');
  }
  this._div.innerHTML = HEADER_HTML + inspector_html;
}

info.addTo(map);


// Legend


// var carbon_legend = L.control({position: 'bottomleft'});
// var wage_legend = L.control({position: 'bottomright'});

function updateLegend(topic){

  var name = "legend" + topic;
  console.log(name);
  eval("var " + name + "= L.control({position: 'bottomright'});");

  var gradesCarbon = [1000, 500, 30, 10, 1],
      gradesWage   = [50, 20, 5, 2, 1]

  var headerCarbon = "<h4>CO2 emitted (kilograms)</h4>",
      headerWage   = "<h4>USD $ earned per day</h4>'"


  topic_grades = eval("grades" + topic)

  legendCarbon.onAdd = function(map){
    var div = L.DomUtil.create('div', 'info legend'),
        carbon_grades = [1000, 500, 30, 10, 1],
        labels = [];

    div.innerHTML += '<h4>CO2 emitted (kilograms)</h4>'

    for(var i=0; i<carbon_grades.length; i++){
      div.innerHTML += '<i style="background:' + getCarbonColor(carbon_grades[i] + 1) + '"></i>';
      if (carbon_grades[i+1]){
        div.innerHTML += carbon_grades[i] + '<br/>'
      }
      else
      {
        div.innerHTML += carbon_grades[i] + '+'
      }

    }

    return div;
  }

  console.log(eval(name + ".addTo(map);"));

  legendWage.onAdd = function(map){
    var div = L.DomUtil.create('div', 'info legend'),
        wage_grades = [50, 20, 5, 2, 1],
        labels = [];

    div.innerHTML += '<h4>USD $ earned per day</h4>'

    for(var i=0; i<wage_grades.length; i++){
      div.innerHTML += '<i style="background:' + getWageColor(wage_grades[i] + 1) + '"></i>';
      if (wage_grades[i+1]){
        div.innerHTML += wage_grades[i] + '<br/>'
      }
      else
      {
        div.innerHTML += wage_grades[i] + '+'
      }

    }

    return div;
  }


}
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from products.models import *
import json


# Add a view to link to the map here
def index_page(request):
  return render(request, 'index.html')

def get_supply_chains(request):
  chains = SupplyChain.objects.all()
  response = serializers.serializers('json', chains)
  return HttpResponse(response, mimetype='application/json')

def get_supply_chain(request, pk):
  waypoints = SupplyChain.objects.get(pk=pk).waypoint_set()
  
  features = []
  for waypoint in waypoints:
    features.append({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': waypoint.location
      },
      'properties': {
        'waypoint_type': waypoint.waypoint_type,
        'facility_address': waypoint.facility_address,
        'company_name': waypoint.company_name,
        'worker_wage': waypoint.waypoint_type,
      }
    })


  waypoints_object = {
    'waypoints': {
      'type': 'FeatureCollection',
      'features': features
    }
  }

  response = json.dumps(waypoints_object)
  
  return HttpResponse(response, 'application/json')

  # transports = (Transport.objects.all().values('method', 'worker_wage'))
  # json_transports = serializers.serialize('json', [transports], ensure_ascii=False)
  # just_object_result = array_result[1:-1]
  # return HttpResponse(json_transports, mimetype='application/json')
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
  product = SupplyChain.objects.get(pk=pk).product
  json_product = serializers.serialize('json', [product])
  json_product = json_product[1:-1]

  transportQuerySet = Transport.objects.filter(supply_chain__pk=pk)
  json_transports = serializers.serialize('json', transportQuerySet)
  
  waypointSet = SupplyChain.objects.get(pk=pk).waypoint_set()
  json_waypoints = serializers.serialize('json', waypointSet)

  response = '{"product":%s, "waypoints":%s, "transports":%s}' % (json_product, json_waypoints, json_transports)
  
  return HttpResponse(response, 'application/json')

  # transports = (Transport.objects.all().values('method', 'worker_wage'))
  # json_transports = serializers.serialize('json', [transports], ensure_ascii=False)
  # just_object_result = array_result[1:-1]
  # return HttpResponse(json_transports, mimetype='application/json')
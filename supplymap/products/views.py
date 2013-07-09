from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from products.models import *
from products.utils import *
import json


# Add a view to link to the map here
def index_page(request):
  product_sets = {}
  for pset in ProductSet.objects.all():
    products = {}
    for product in pset.product_set.all():
      supply_chain = SupplyChain.objects.get(product=product.pk)
      products[supply_chain.pk]=product.name
    print products
    product_sets[pset.name]=products
  print product_sets
  return render(request, 'index.html', { 'product_sets': product_sets })

def get_supply_chains(request):
  chains = SupplyChain.objects.all()
  response = serializers.serializers('json', chains)
  return HttpResponse(response, mimetype='application/json')

def get_supply_chain(request, pk):
  chain      = SupplyChain.objects.get(pk=pk)
  product    = chain.product
  waypoints  = chain.waypoint_set()
  transports = Transport.objects.filter(supply_chain__pk=pk)


  product_object    = make_product_json(product)
  waypoints_object  = make_waypoint_geojson(waypoints)
  transports_object = make_transport_geojson(transports)

  product_object.update(waypoints_object)
  product_object.update(transports_object)

  supply_chain_object = {'supply_chains':[product_object]}
  response = json.dumps(supply_chain_object)
  
  return HttpResponse(response, 'application/json')

  # transports = (Transport.objects.all().values('method', 'worker_wage'))
  # json_transports = serializers.serialize('json', [transports], ensure_ascii=False)
  # just_object_result = array_result[1:-1]
  # return HttpResponse(json_transports, mimetype='application/json')
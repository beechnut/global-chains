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
  response = serializers.serialize('json', chains)
  return HttpResponse(response, mimetype='application/json')

def get_supply_chain(request, id):
  chain = SupplyChain.objects.get(pk=id)
  # waypoints  = chain.waypoint_set.all()
  # waypoints are assigned through transports, should have a custom method for thiss
  transports = chain.transport_set.all()
  array_result = serializers.serialize('json', [waypoints], ensure_ascii=False)
  just_object_result = array_result[1:-1]
  return HttpResponse(just_object_result, mimetype='application/json')

# Add a views to serve up GeoJSON for a given product

# class BlogJSON(JSONListView):

#   def get_context_data(self, **kwargs):
#         context = super(BlogJSON, self).get_context_data(**kwargs)
#         context['countries'] = make_geojson([entry.author.pcvprofile.country for entry in self.object_list])
#         return context
        
# def make_geojson(codes):
#     features = []
#     for code in set(codes):
#         features.append({
#             'type': "Feature",
#             'geometry': {
#                 'type': "Point",
#                 'coordinates': data_options.COUNTRIES[code]['coords']
#             },
#             'properties': { 'title': code }
#         })

#     return {
#         'type': "FeatureCollection",
#         'features': features
#     }
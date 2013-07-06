# Create your views here.

# Add a view to link to the map here
home_page = None

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
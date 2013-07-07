def longlat(coords):
  longlat = coords.split(',')[::-1] # splits, then reverses
  return longlat

def make_waypoint_geojson(waypoints):

  """
  Converts a given list of Waypoint objects in to GeoJSON, 
  specifically a FeatureCollection of Point objects
  """

  features = []

  for waypoint in waypoints:
    features.append({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': longlat(waypoint.location)
      },
      'properties': {
        'waypoint_type': waypoint.waypoint_type,
        'facility_address': waypoint.facility_address,
        'company_name': waypoint.company_name,
        'worker_wage': str(waypoint.worker_wage),
      }
    })

  waypoints_object = {  # Python isn't super clever: can't return an assignment
    'waypoints': {
      'type': 'FeatureCollection',
      'features': features
    }
  }

  return waypoints_object





def make_transport_geojson(transports):

  """
  Converts a given list of Transport objects in to GeoJSON, 
  specifically a FeatureCollection of LineString objects
  """

  features = []

  for transport in transports:
    features.append({
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [longlat(transport.origin.location),longlat(transport.destination.location)]
      },
      'properties': {
        'method': transport.method,
        'worker_wage': str(transport.worker_wage),
        'carbon_output': str(transport.carbon_output),
        'duration': str(transport.duration),
      }
    })

  transports_object = {  # Python isn't super clever: can't return an assignment
    'transports': {
      'type': 'FeatureCollection',
      'features': features
    }
  }

  return transports_object




def make_product_json(product):
  
  """
  Converts a given product to JSON
  """

  product_object = {
    'product':{
      'name': product.name,
      'company': product.company,
      'description': product.description,
      'cost': str(product.cost),
      'carbon_output': str(product.carbon_output),
    }
  }
  return product_object








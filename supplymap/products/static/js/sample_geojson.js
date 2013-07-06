var data =
{
  'supply_chains':
  [
    {
      'product': 'Plate',
      'waypoints': {
        'type': "FeatureCollection",
        'features':
        [
          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-82.552063,35.593669]
            },
            'properties': {
              'waypoint_type':    'Distributor',
              'facility_address': 'Asheville, NC',
              'company_name':     'Shipping Exports Etc',
              'worker_wage':      '9'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [77.675888,12.838917]
            },
            'properties': {
              'waypoint_type':    'Manufacturer',
              'facility_address': 'Electronics City, Bangalore, India',
              'company_name':     'Sheeba',
              'worker_wage':      '2'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-88.412476,16.930705]
            },
            'properties': {
              'waypoint_type':    'Raw Material Supplier',
              'facility_address': 'Dangriga, Belize',
              'company_name':     'nil',
              'worker_wage':      '1'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-71.101033,42.373542]
            },
            'properties': {
              'waypoint_type':    'Consumer',
              'facility_address': 'Cambridge St, Cambridge MA',
              'company_name':     'Consumer',
              'worker_wage':      '400'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-71.118729,42.304737]
            },
            'properties': {
              'waypoint_type':    'Retailer',
              'facility_address': 'Centre St, Jamaica Plain, MA',
              'company_name':     'Kitchenwitch',
              'worker_wage':      '300'
            }
          }
        ]
      },

      'transports': {
        'type': "FeatureCollection",
        'features':
        [
          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-71.118729,42.304737], [-71.101033,42.373542]]
            },
            'properties': {
              'description':  'Jamaica Plain, MA to Cambridge, MA',
              'method':       'automobile',
              'company':      'Distributor',
              'duration':     '1',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '10'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-82.552063,35.593669],[-71.118729,42.304737]]
            },
            'properties': {
              'description':  'Asheville, NC to Jamaica Plain, MA',
              'method':       'train',
              'company':      'Distributor',
              'duration':     '12',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '90'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[77.675888,12.838917],[-82.552063,35.593669]]
            },
            'properties': {
              'description':  'Electronics City, Bangalore, India to Asheville, NC',
              'method':       'plane',
              'company':      'Distributor',
              'duration':     '20',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '2000'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-88.412476,16.930705],[77.675888,12.838917]]
            },
            'properties': {
              'description':  'Dangriga, Belize to Electronics City, Bangalore, India',
              'method':       'ship',
              'company':      'Distributor',
              'duration':     '32',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '900'
            }
          }
        ]
      }
    }, 
    // end of supply chain 1
    {
      'product': 'Cup',
      'waypoints': {
        'type': "FeatureCollection",
        'features':
        [
          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [106.903625,-6.105053]
            },
            'properties': {
              'waypoint_type':    'Raw Material Supplier',
              'facility_address': 'Jakarta, Indonesia',
              'company_name':     'Co',
              'worker_wage':      '9'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [116.427183,39.880235]
            },
            'properties': {
              'waypoint_type':    'Manufacturer',
              'facility_address': 'Beijing, China',
              'company_name':     'Stuffco',
              'worker_wage':      '2'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-73.959961,40.557635]
            },
            'properties': {
              'waypoint_type':    'Storage Facility',
              'facility_address': 'Brooklyn, NY',
              'company_name':     'Brooklyn With Limits',
              'worker_wage':      '14'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-73.991761,40.762861]
            },
            'properties': {
              'waypoint_type':    'Distributor',
              'facility_address': "Hell's Kitchen, NY",
              'company_name':     "Hell's Kitchen Goods",
              'worker_wage':      '20'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-71.118729,42.304737]
            },
            'properties': {
              'waypoint_type':    'Retailer',
              'facility_address': 'Centre St, Jamaica Plain, MA',
              'company_name':     'Kitchenwitch',
              'worker_wage':      '300'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "Point",
              'coordinates': [-71.101033,42.373542]
            },
            'properties': {
              'waypoint_type':    'Consumer',
              'facility_address': 'Cambridge St, Cambridge MA',
              'company_name':     'Consumer',
              'worker_wage':      '400'
            }
          }
        ]
      },

      'transports': {
        'type': "FeatureCollection",
        'features':
        [
          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-71.118729,42.304737], [-71.101033,42.373542]]
            },
            'properties': {
              'description':  'Jamaica Plain, MA to Cambridge, MA',
              'method':       'automobile',
              'company':      'Distributorly',
              'duration':     '1',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '10'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-73.991761,40.762861],[-71.118729,42.304737]]
            },
            'properties': {
              'description':  "Hell's Kitchen, NY to Jamaica Plain, MA",
              'method':       'train',
              'company':      'Distributor',
              'duration':     '12',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '90'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[-73.959961,40.557635],[-73.991761,40.762861]]
            },
            'properties': {
              'description':  "Brooklyn, NY to Hell's Kitchen, NY",
              'method':       'plane',
              'company':      'Distributor',
              'duration':     '20',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '2000'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[116.427183,39.880235],[-73.959961,40.557635]]
            },
            'properties': {
              'description':  'Beijing, China to Brooklyn, NY',
              'method':       'ship',
              'company':      'Distributor',
              'duration':     '32',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '900'
            }
          },

          {
            'type': "Feature",
            'geometry': {
              'type': "LineString",
              'coordinates': [[106.903625,-6.105053],[116.427183,39.880235]]
            },
            'properties': {
              'description':  'Jakarta, Indonesia to Beijing, China',
              'method':       'ship',
              'company':      'Distributor',
              'duration':     '32',
              'company_name': 'Shipping Exports Etc',
              'worker_wage':  '10',
              'carbon_output': '900'
            }
          }
        ]
      }
    }, // end of supply chain 2
  ]
}
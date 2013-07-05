from django.db import models
from djangotoolbox.fields import ListField, EmbeddedModelField

class Product(models.Model):
    name          = models.CharField(max_length=100)
    company       = models.CharField(max_length=100)
    description   = models.CharField(max_length=400)
    cost          = models.DecimalField(max_digits=9, decimal_places=2)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2)

    def __unicode__(self):
        return self.name


WAYPOINT_TYPES =   (('rmsp', 'Raw Material Supplier'),
                    ('manu', 'Manufacturer'),
                    ('stor', 'Storage Facility'),
                    ('dist', 'Distributor'),
                    ('retl', 'Retailer'),
                    ('cons', 'Consumer'))

class Waypoint(models.Model):
    location         = ListField()
    waypoint_type    = models.CharField(max_length=40, choices=WAYPOINT_TYPES)
    facility_address = models.CharField(max_length=200)
    company_name     = models.CharField(max_length=200)
    worker_wage      = models.DecimalField(max_digits=5, decimal_places=2)

    def __unicode__(self):
        return self.company_name + " " + self.location
  

TRANSPORT_METHODS = (('s', 'ship'), ('p', 'plane'), ('x', 'train'), ('a', 'automobile'))

class Transport(models.Model):
    origin        = ListField()
    destination   = ListField()
    method        = models.CharField(max_length=30, choices=TRANSPORT_METHODS)
    company       = models.CharField(max_length=100)
    duration      = models.DecimalField(max_digits=5, decimal_places=2)
    worker_wage   = models.DecimalField(max_digits=5, decimal_places=2)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2)

    def __unicode__(self):
        return self.method + "from " + self.origin + " to " + self.destination


class SupplyChain(models.Model):
    product    = EmbeddedModelField('Product')
    waypoints  = ListField(EmbeddedModelField('Waypoint'))
    transports = ListField(EmbeddedModelField('Transport'))

    def __unicode__(self):
        return "Supply chain for " + self.product + " starting at" + self.waypoints[0]

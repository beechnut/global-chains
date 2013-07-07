from django.db import models
from djangotoolbox.fields import ListField, EmbeddedModelField
from jsonresponse import to_json

class Product(models.Model):
    name          = models.CharField(max_length=100)
    company       = models.CharField(max_length=100, blank=True)
    description   = models.CharField(max_length=400)
    cost          = models.DecimalField(max_digits=9, decimal_places=2, blank=True)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2, blank=True)

    def __unicode__(self):
        return self.name


class SupplyChain(models.Model):
    product    = models.ForeignKey(Product)

    def __unicode__(self):
        return "Supply chain for " + self.product.name

    def serialize(self):
        return dict(name=self.product.name)


WAYPOINT_TYPES =   (('rmsp', 'Raw Material Supplier'),
                    ('manu', 'Manufacturer'),
                    ('stor', 'Storage Facility'),
                    ('dist', 'Distributor'),
                    ('retl', 'Retailer'),
                    ('cons', 'Consumer'))

class Waypoint(models.Model):
    location         = models.CharField(max_length=40, blank=True)
    waypoint_type    = models.CharField(max_length=40, choices=WAYPOINT_TYPES)
    facility_address = models.CharField(max_length=200)
    company_name     = models.CharField(max_length=200, blank=True)
    worker_wage      = models.DecimalField(max_digits=5, decimal_places=2, blank=True)

    def __unicode__(self):
        return self.company_name + " " + self.location
  

TRANSPORT_METHODS = (('s', 'ship'), ('p', 'plane'), ('x', 'train'), ('a', 'automobile'))

class Transport(models.Model):
    origin        = models.ForeignKey(Waypoint, related_name='origin_waypoint')
    destination   = models.ForeignKey(Waypoint, related_name='destination_waypoint')
    method        = models.CharField(max_length=30, choices=TRANSPORT_METHODS)
    company       = models.CharField(max_length=100, blank=True)
    duration      = models.DecimalField(max_digits=5, decimal_places=2, blank=True)
    worker_wage   = models.DecimalField(max_digits=5, decimal_places=2, blank=True)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2, blank=True)
    supply_chain = models.ForeignKey(SupplyChain)

    def __unicode__(self):
        return self.supply_chain.product.name + ": " + self.origin.facility_address + " to " + self.destination.facility_address


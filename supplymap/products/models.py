from django.db import models
from djangotoolbox.fields import ListField, EmbeddedModelField
import urllib, urllib2, json

class Product(models.Model):
    name          = models.CharField(max_length=100)
    company       = models.CharField(max_length=100, null=True, blank=True)
    description   = models.CharField(max_length=400)
    cost          = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)

    def __unicode__(self):
        return self.name


class SupplyChain(models.Model):
    product    = models.ForeignKey(Product)

    def __unicode__(self):
        return "Supply chain for " + self.product.name

    def waypoint_set(self):
        waypoints = set()       # keeps unique during add
        transports = self.transport_set.all()
        for transport in transports:
            waypoints.add(transport.origin)
        waypoints.add(transports[::-1][0].destination) # gets last destination: reverses & gets first item in reversed
        return list(waypoints)  # makes it more accessible as a list


WAYPOINT_TYPES =   (('rmsp', 'Raw Material Supplier'),
                    ('manu', 'Manufacturer'),
                    ('stor', 'Storage Facility'),
                    ('dist', 'Distributor'),
                    ('retl', 'Retailer'),
                    ('cons', 'Consumer'))

class Waypoint(models.Model):
    location         = models.CharField(max_length=40, null=True, blank=True)
    waypoint_type    = models.CharField(max_length=40, choices=WAYPOINT_TYPES)
    facility_address = models.CharField(max_length=200)
    company_name     = models.CharField(max_length=200, null=True, blank=True)
    worker_wage      = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __unicode__(self):
        return self.company_name # + " " + str(self.location)

    def save(self, *args, **kwargs):
        if not self.location:
            self.location = self.geocode()
        super(Waypoint, self).save(*args, **kwargs) # Call the "real" save() method.

    def geocode(self):
        address = self.facility_address
        safe_address = urllib.quote_plus(address)
        url = "http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % safe_address

        response = urllib2.urlopen(url)
        jsongeocode = response.read()
        geodata = json.loads(jsongeocode)

        lng = geodata['results'][0]['geometry']['location']['lng']
        lat = geodata['results'][0]['geometry']['location']['lat']
        location = "%s,%s" % (lat, lng)
        return location  

TRANSPORT_METHODS = (('s', 'ship'), ('p', 'plane'), ('x', 'train'), ('a', 'automobile'))

class Transport(models.Model):
    origin        = models.ForeignKey(Waypoint, related_name='origin_waypoint')
    destination   = models.ForeignKey(Waypoint, related_name='destination_waypoint')
    method        = models.CharField(max_length=30, choices=TRANSPORT_METHODS)
    company       = models.CharField(max_length=100, null=True, blank=True)
    duration      = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    worker_wage   = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    carbon_output = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    supply_chain  = models.ForeignKey(SupplyChain)

    def __unicode__(self):
        return self.supply_chain.product.name + ": " + self.origin.facility_address + " to " + self.destination.facility_address


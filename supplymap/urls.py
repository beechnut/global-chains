from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'supplymap.views.home', name='home'),
    # url(r'^supplymap/', include('supplymap.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'products.views.index_page', name='index'),
    
    # /get_supply chains will return JSON for all supply chains
    url(r'^get_supply_chains$', 'products.views.get_supply_chains', name='get_supply_chains'),

    # /get_supply chains will return JSON for all supply chains
)

Global Chains
==========

__Global Chains__ enables you to explore the supply chains of everyday products you use. You can visualize and inspect information regarding the carbon footprint of various products, and the wage/standard-of-living inequalities at different stages of the product's life.

### End Users

Users click on a product in a set to see that product's global traverse, from raw material to finished product.

With the supply chain displayed, users can click on the various waypoints to explore information about that waypoint. They could inspect a manufacturer in China, a shipping facility in Japan, a warehouse in New York, and a local distribution center in North Carolina.

### Administrators

Administrators can add products and supply chains. The plan is to allow users to create sets of products that can be shared.

#### Best Practices

This app will be best used if it demonstrates:

+ differences in supply chains between similar products, but where one is manufactured locall and the other overseas
+ global interdependencies
+ global inequities
+ ecological impact / carbon output of global trade

For example, worker wage information and worker demographics should be added to waypoints when possible.

The user might create product sets to highlight the variety of countries through which a product passes before it ends up, in, say, one particular cafe in Boston.

Or, it might be used to display supply chains that originate in particular country (say, Belize), and where they end up across the world.

If tranportation types are added, the app will calculate a rough carbon output based on the transport mode.



Administrator Story
-------------------
The admin logs in using a username and password.

They see a page that has an 'Add Product button.' They click it.

They add info to `product name` and `product description` and optional fields `product cost` and `carbon output`.

They then fill in information about the first waypoint: the origin of the product. (At the moment, the app can only handle linear supply chains: it does not permit mutliple converging paths, which is admittedly a more accurate model, which are planned for a future version.)

For the product origin, they add a `company name`, `facility address`, `worker wage`, and `waypoint type`, which is one of Raw Material Supplier, Manufacturer, Storage Facility, Distributor, Retailer, Consumer.

They click "add a second waypoint" which asychronously adds some fields for a transportation object, which is entirely optional. The admin selects a transportation mode (one of Ship, Plane, Train, Automobile).

The admin can add a `carbon output` amount if they know it; if not, it will be estimated based on the transport mode and distance between the two waypoints.

The admin can also add information to optional fields: `transport company`, `trip duration`, `worker wage`.

The last step in the chain should be the consumer location, which might be the address of a restaurant, city, or residential street.



Getting Started in Development
------------------------------

### OS X

Clone the repository.
`git clone git@github.com:beechnut/supply-map.git`

Set up a virtual environment.

`virtualenv --no-site-packages your-environment-name-here`

Activate your virtual environment.

`source your-environment-name-here/bin/activate`

Install the dependencies.

`pip install -r bundle.txt`

Sync and migrate the database.

```bash
python manage.py syncdb
python manage.py migrate
```

Load the seed data into the database.

`python manage.py loaddata seeds.json`

Run the database

`python manage.py `

#### Alias for `python manage.py`

To cut down on keystrokes, add an alias to your .bash_profile.

If you're using Sublime Text 2 with the `subl` shortcut, run the following command. Otherwise, use the proper text editor shortcut in place of subl (use vi if you don't have any).

`subl ~/.bash_profile`

Add the line:

`alias mpy='python manage.py'`

Save and exit.

Now you can run commands like `mpy runserver`.


Developer Information
---------------------

The app uses Django for a backend, and Leaflet with Cloudmade for map display.

Waypoint types:
  Raw Material Supplier
  Manufacturer
  Storage Facility
  Distributor
  Retailer
  Consumer

Transport types:
  Ship
  Plane
  Train
  Automobile
import unittest
from selenium import webdriver

class NewVisitorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_product_list_and_retrieve_it_later(self):
       # Sarah want to provide info on the supply chain of a product
        # and navigates to Supply Map
        self.browser.get('http://localhost:8000')

        # She notices the page title and header mention the map
        self.assertIn('Supply Map', self.browser.title)
        self.fail('Finish the tests!')

        # She signs up as a member of the site, and logs in with
        # the credentials she chose.

        # She adds a product to her list of products.

        # She adds a second product to her list of products.

        # She looks at her product list.

        # She starts to add a supply chain to one product.

        # She adds a waypoint to the product.

        # She clicks "add a link", and fields for a waypoint and a
        # second waypoint appear.

        # She visits the map, which shows the products that
        # she has listed.

if __name__ == '__main__':
    unittest.main()
# Demo Tests
This is a test suite for the SauceDemo website to demo.

## Login functionality
Valid users must be able to log in, and invalid users must be blocked.

Tags: login, validation

* Navigate to the test site
* Verify the login form is ready for login
* Login as    
    |username       |login_status |error_msg                                                                |
    |---------------|-------------|-------------------------------------------------------------------------|
    |standard_user  |true         |                                                                         |
    |locked_out_user|false        |Epic sadface: Sorry, this user has been locked out.                      |        
    |problem_user   |true         |
    |random_user    |false        |Epic sadface: Username and password do not match any user in this service|

## Cart functionality
* Login as a "standard_user"
* Add to cart    
    |id                    |quantity|
    |----------------------|--------|
    |sauce-labs-backpack   |1       |
    |sauce-labs-bike-light |1       |
    |sauce-labs-onesie     |1       |

* Navigate to Cart
* Remove "item" from Cart
* Verify items in the cart
    |id                    |item_name             |quantity|
    |----------------------|----------------------|--------|
    |sauce-labs-backpack   |Sauce Labs Backpack   |1       |
    |sauce-labs-bike-light |Sauce Labs Bike Light |1       |
    |sauce-labs-onesie     |Sauce Labs Onesie     |1       |
___
## Teardown session
* Sign out from account

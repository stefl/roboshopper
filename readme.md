# Roboshopper

A tiny utility that helps you to create test orders in your Shopify store for testing purposes.

* Clone this repo
* Install 'yarn' if you do not have it. This will install a "headless" Chromium so may take some time.
* Edit `index.js` to point to your test store URL
* Ensure that on your Shopify store you have 'test mode' enabled in Admin -> Payment Providers -> Shopify Payments -> Edit
* `yarn install`
* `yarn run robot`

Watch as the robot browses your test store and creates an order!

Thanks to the Puppeteer and Chromium teams!
    
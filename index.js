const puppeteer = require('puppeteer');
var faker = require('faker/locale/en');
faker.locale = "en";

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const email = faker.internet.email(firstName, lastName, 'example.com');
const firstLine = faker.address.streetAddress();
const city = faker.address.city();
const postcode = 'M11AA'; //faker.address.zipCode();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log(firstName);


(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://robogifts.myshopify.com/collections/all', {waitUntil: 'networkidle2'});
  await page.waitForSelector('.grid-view-item__link');
  const productCounts = await page.$$eval('.grid-view-item__link', divs => divs.length);
  await page.click(`.grid--view-items .grid__item:nth-of-type(${Math.floor(Math.random()*productCounts) + 1}`);
  await page.waitForSelector('#AddToCart-product-template')
  await page.click('#AddToCart-product-template')
  await page.waitForSelector('.cart__footer input[name=checkout]')
  await page.click('.cart__footer input[name=checkout]')
  await page.waitForSelector('.edit_checkout')

  
  

  await page.type('input[type=email]', email, {delay: 20});
  await page.type('#checkout_shipping_address_first_name', firstName, {delay: 20})
  await page.type('#checkout_shipping_address_last_name', lastName, {delay: 20})
  await page.type('#checkout_shipping_address_address1', firstLine, {delay: 20})
  await page.type('#checkout_shipping_address_city', city, {delay: 20})
  await page.type('#checkout_shipping_address_zip', postcode, {delay: 20})
  await page.click('button[name=button]')
  await page.waitForSelector('.section--shipping-method')
  await page.click('button[name=button]')

  await sleep(2000);
  
  // Brittle!!
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await sleep(1000);
  await page.keyboard.type('4242424242424242', {delay: 50})
  await sleep(1000);
  await page.keyboard.press('Tab')
  await sleep(1000);
  await page.keyboard.type(`${firstName} ${lastName}`, {delay: 20})
  await sleep(1000);
  await page.keyboard.press('Tab')
  await sleep(1000);
  await page.keyboard.type('12/22')
  await sleep(1000);
  await page.keyboard.press('Tab')
  await sleep(1000);
  await page.keyboard.type('111')
  await sleep(1000);
  await page.evaluate(_ => {
    window.scrollBy(0, window.innerHeight);
  });
  await sleep(1000);
  await page.click('.shown-if-js button')
  //await sleep(2000);
  //await page.click('.shown-if-js button')
  await sleep(5000);
  await page.waitForSelector('.order-summary-toggle')
  await sleep(2000);
  await browser.close();
})();
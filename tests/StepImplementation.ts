import {
  Step,
  Table,
  BeforeSuite,
  AfterSuite,
  BeforeSpec,
  AfterSpec,
} from "gauge-ts";
import LoginPage from "../pageObjects/login.page";
import { firefox, Page, Browser } from "playwright";
import assert = require('node:assert');
import * as dotenv from "dotenv";
import path = require("path");
import HomePage from "../pageObjects/home.page";
import CartPage from "../pageObjects/cart.page";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const password = process.env.PASSWORD;
const url = process.env.BASE_URL;

let loginPage: LoginPage;
let homePage: HomePage;
let browser: Browser;
let cartPage: CartPage;
export let page: Page;

export default class StepImplementation {
  @BeforeSuite()
  public async beforeSuite() {
    browser = await firefox.launch({ headless: false });
  }

  @BeforeSpec()
  public async beforeSpec() {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
  }

  @AfterSpec()
  public async afterSpec() {
    await page.close();
  }

  @AfterSuite()
  public async afterSuite() {
    await browser.close();
  }

  @Step("Navigate to the test site")
  public async navigateToLogin() {
    await loginPage.navigateToLoginPage(url);
  }
  @Step("Login as <table>")
  public async loginFunctionality(table: Table){
    for (var row of table.getTableRows()){
      await loginPage.usernameInput.fill(row.getCell('username'));
      await loginPage.passwordInput.fill(password);
      await loginPage.loginBtn.click();
      if (row.getCell('login_status') == 'false'){
        if (row.getCell('username') == 'locked_out_user'){
          assert.strictEqual(await loginPage.loginError.textContent(), row.getCell('error_msg'), 'This should display a correct error');
        }        
        assert.strictEqual(await loginPage.loginError.textContent(), row.getCell('error_msg'), 'This should display a correct error');  
      }else{
        assert.strictEqual(await homePage.burgerMenu.isEnabled(), Boolean(row.getCell('login_status')), 'Burger: This should match');
        assert.strictEqual(await homePage.cartBtn.isEnabled(), Boolean(row.getCell('login_status')), 'Cart: This should match');
        await homePage.burgerMenu.click();
        await homePage.logOutBtn.click();
      }
    }
  }
  @Step("Login as a <user>")
  public async loginWithValidCredentials(user: string) {
    await loginPage.usernameInput.fill(user);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginBtn.click();
  }

  @Step("Navigate to Cart")
  public async navigateToCart() {
    await homePage.cartBtn.click();
  }

  @Step("Verify items in the cart <table>")
  public async verifyItemsInCart(table: Table) {
    for (var row of table.getTableRows()){
      const itemName = row.getCell('item_name');
      const itemQuantity = row.getCell('quantity');
      assert.ok(await cartPage.getCartItem(itemName).isVisible(), `Item '${itemName} should exist in the Cart`);
      assert.equal(await cartPage.getCartItemQuantity(itemName), itemQuantity, `Item '${itemName}' should have ${itemQuantity} counts`);
    }
  }

  @Step("Verify the login form is ready for login")
  public async checkLoginUI() {
    assert.strictEqual(await loginPage.usernameInput.isEnabled(), true, 'This input field should be enabled');
    assert.strictEqual(await loginPage.passwordInput.isEnabled(), true, 'This input field should be enabled');
    assert.strictEqual(await loginPage.loginBtn.isEnabled(), true, 'This button should be enabled');
  }

  @Step("Add to cart <table>")
  public async addItemToCart(table: Table) {
    let c = 0;
    for (var row of table.getTableRows()){
      const quantity = parseInt(row.getCell('quantity'), 10);
      for (let i = 0; i < quantity; i++)  {
        await homePage.addToCartBtn(row.getCell('id')).click();
        c++;
      }
    }
    assert.equal(await cartPage.cartBadge.textContent(), c, 'The badge should display the correct amount');
  }

  @Step("Remove <item> from Cart")
  public async removeItemFromCart(item:string){

  }
  @Step("Sign out from account")
  public async signOutFromAcc() {
    if (await homePage.appLogo.isVisible()) {
      await homePage.burgerMenu.click();
      await homePage.logOutBtn.click();
    }
  }
}

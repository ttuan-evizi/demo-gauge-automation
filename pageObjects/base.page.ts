import { Page } from "@playwright/test";

export default class BasePage {
  readonly burgerMenu = this.page.locator(`//div[contains(@class, 'burger-button')]/button`);
  readonly cartBtn = this.page.locator(`//*[@data-test='shopping-cart-link']`);
  readonly sideMenu = this.page.locator(`//div[@class='bm-menu-wrap']`);
  readonly logOutBtn = this.page.locator(`//*[@data-test='logout-sidebar-link']`);
  readonly appLogo = this.page.locator(`//div[@class='app_logo']`);

  constructor(readonly page: Page) {}

}

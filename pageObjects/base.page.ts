import { Page } from "@playwright/test";

export default class BasePage {
  readonly burgerMenu = `//div[contains(@class, 'burger-button')]/button`;
  readonly cartBtn = this.page.getByTestId(`shopping-cart-link`);
  readonly sideMenu = `//div[@class='bm-menu-wrap']`;
  readonly logOutBtn = this.page.getByTestId(`logout-sidebar-link`);

  constructor(readonly page: Page) {}
}

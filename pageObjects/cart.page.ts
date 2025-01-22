import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class CartPage extends BasePage {
  readonly cartBadge = this.page.locator(`//span[@data-test='shopping-cart-badge']`);
  constructor(readonly page: Page) {
    super(page);
  }

  removeBtn(item: string) {
    return this.page.locator(`//button[@data-test='remove-${item}']`);
  };

  getCartItem(name: string){
    return this.page.locator(`//div[text()='${name}']`);
  };

  async getCartItemQuantity(itemName: string) {
    const quantityLocator = this.page.locator(`//div[@data-test='inventory-item'][.//div[text()='${itemName}']]//div[@data-test='item-quantity']`);
    const quantityText = await quantityLocator.textContent();
    return parseInt(quantityText || '0', 10);
  }
}
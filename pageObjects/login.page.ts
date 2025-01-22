import { Page } from '@playwright/test';

export default class LoginPage {
  readonly usernameInput = this.page.locator(`//*[@data-test='username']`);
  readonly passwordInput = this.page.locator(`//*[@data-test='password']`);
  readonly loginBtn = this.page.locator(`//*[@data-test='login-button']`);

  readonly loginError = this.page.locator(`//*[@data-test='error']`);

  constructor(readonly page: Page) {}

  async navigateToLoginPage(url: string){
    await this.page.goto(url);
  }
}
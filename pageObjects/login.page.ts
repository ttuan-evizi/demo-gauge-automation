import { Page } from '@playwright/test';

export default class LoginPage {
  readonly usernameInput = this.page.getByTestId(`username`);
  readonly passwordInput = this.page.getByTestId(`password`);
  readonly loginBtn = this.page.getByTestId(`login-button`);

  readonly loginError = this.page.getByTestId('error');

  constructor(readonly page: Page) {}

  async navigateToLogin(){
    await this.page.goto('/');
  }
}
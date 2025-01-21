import {test as base } from '@playwright/test';
import HomePage from '../pageObjects/home.page';
import LoginPage from '../pageObjects/login.page';

type Fixture = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<Fixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
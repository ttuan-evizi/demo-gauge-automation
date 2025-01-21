import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class HomePage extends BasePage {
  
  
  constructor(readonly page: Page) {
    super(page);
  }
}
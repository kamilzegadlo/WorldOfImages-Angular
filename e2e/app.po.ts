import { browser, by, element, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { promise } from 'selenium-webdriver';


export class AppPage {
  private EC=protractor.ExpectedConditions;

  navigateTo() {
    return browser.get('/');
  }

  getMap(): ElementFinder {
    return element(by.id('WorldMap'));
  }

  getUserMessage(): ElementFinder {
    return element(by.id('userMessage'));
  }

  isElementPresent(element: ElementFinder): promise.Promise<boolean> {
    return element && element.isDisplayed() && element.isEnabled() && element.isPresent();
  }

  elementDisappear(element: ElementFinder): promise.Promise<boolean>{
    return browser.wait(this.EC.not(this.EC.presenceOf(element)));
  }
}

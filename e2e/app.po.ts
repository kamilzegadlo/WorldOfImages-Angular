import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { promise } from 'selenium-webdriver';


export class AppPage {
  protected EC = protractor.ExpectedConditions;
  protected timeOut = 20000;

  navigateTo() {
    return browser.get('/');
  }

  getMap(): ElementFinder {
    return element(by.id('WorldMap'));
  }

  getUserMessage(): ElementFinder {
    return  this.getUserMessages().get(0);
  }

  getUserMessages(): ElementArrayFinder {
    return element.all(by.id('userMessage'));
  }

  isElementPresent(el: ElementFinder): promise.Promise<boolean> {
    return browser.wait(this.EC.presenceOf(el), this.timeOut);
  }

  elementDisappear(el: ElementFinder): promise.Promise<boolean> {
    return browser.wait(this.EC.invisibilityOf(el), this.timeOut);
  }

  clickSpecifPlaceOnTheMap(x: number, y: number) {
    browser.actions()
      .mouseMove(this.getMap(), {x: x, y: y})
      .click()
      .perform();
  }

  setValue(el: ElementFinder, text: string) {
    browser.wait(this.EC.elementToBeClickable(el), this.timeOut).then(() =>
      this.isElementPresent(el).then(() => 
        el.clear().then(() => 
        el.sendKeys("Test Name"))));
  }

  isElementFocused(el: ElementFinder): promise.Promise<Boolean>{
    return browser.driver.switchTo().activeElement().getAttribute('id').then(
      idofFocused => el.getAttribute('id').then(idOfGiven => idofFocused === idOfGiven));
  }

}

import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { promise } from 'selenium-webdriver';


export class AppPage {
  protected EC=protractor.ExpectedConditions;
  protected timeOut=20000; 

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

  isElementPresent(element: ElementFinder): promise.Promise<boolean> {
    return browser.wait(element && element.isDisplayed() && element.isEnabled() && element.isPresent(), this.timeOut);
  }

  elementDisappear(element: ElementFinder): promise.Promise<boolean>{
    return browser.wait(this.EC.invisibilityOf(element), this.timeOut);
  }

  clickSpecifPlaceOnTheMap(x: number, y: number){
    browser.actions()
      .mouseMove(this.getMap(), {x: x, y: y})
      .click()
      .perform();
  }

  setValue(element: ElementFinder, text: string){
    browser.wait(this.EC.elementToBeClickable(element), this.timeOut).then(()=>
      this.isElementPresent(element).then(()=> 
        element.clear().then(()=> 
          element.sendKeys("Test Name"))));
  }

  isElementFocused(element: ElementFinder): promise.Promise<Boolean>{
    return browser.driver.switchTo().activeElement().getAttribute('id').then(
      idofFocused => element.getAttribute('id').then(idOfGiven=> idofFocused===idOfGiven));
  }

}

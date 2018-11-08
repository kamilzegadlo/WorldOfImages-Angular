import { browser, by, element, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { promise, WebElement } from 'selenium-webdriver';


export class AppPage {
  private EC=protractor.ExpectedConditions;
  private timeOut=60000; 

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
    return browser.wait(this.EC.not(this.EC.presenceOf(element)), this.timeOut);
  }

  clickSpecifPlaceOnTheMap(x: number, y: number){
    browser.actions()
      .mouseMove(this.getMap(), {x: x, y: y})
      .click()
      .perform();
  }

  getNotDefinedLabel(): ElementFinder{
    return element(by.id('notDefinedLabel'));
  }

  getNotDefinedNameInput(): ElementFinder{
    return element(by.id('newPlaceName'));
  }

  getNotDefinedSubmitButton(): ElementFinder{
    return element(by.id('saveNewPlace'));
  }

  getDefinedPlaceName(): ElementFinder{
    return element(by.id('placeSelectedLabel'));
  }

  getDefinedIcon(): ElementFinder{
    return element(by.id('imageChooserImage'));
  }

  getDefinedTip(): ElementFinder{
    return element(by.id('definedPlaceTip'));
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

  getImages(): promise.Promise<WebElement[]>{
    return browser.driver.findElements(by.css('.image--basic'));
  }
}

import { browser, by, element, ElementFinder } from 'protractor';
import { promise, WebElement } from 'selenium-webdriver';
import { AppPage } from './app.po';


export class DefinedPlacePage extends AppPage {

  getDefinedPlaceName(): ElementFinder{
    return element(by.id('placeSelectedLabel'));
  }

  getDefinedIcon(): ElementFinder{
    return element(by.id('imageChooserImage'));
  }

  getDefinedFileInput(): ElementFinder{
    return element(by.id('imageChooser'));
  }

  getDefinedTip(): ElementFinder{
    return element(by.id('definedPlaceTip'));
  }

  getImages(): promise.Promise<WebElement[]>{
    return browser.driver.findElements(by.css('.basic__img'));
  }

  getExpandedImage(): ElementFinder{
    return element(by.id('image--large'));
  }
}

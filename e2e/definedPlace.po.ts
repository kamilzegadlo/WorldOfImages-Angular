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

  waitUntilThereAreNImages(n: number){
    browser.wait(
      ()=> {
        return this.getImages().then( (images) => {
            return images.length >= n;
        });
      }, this.timeOut);
  }

  getFirstImage(): ElementFinder{
    return element(by.css('.basic__img'));
  }

  getExpandedImage(): ElementFinder{
    return element(by.css('.image--large'));
  }

  getCloseExpandedImageButton(): ElementFinder{
    return element(by.css('.expand__close'));
  }
  
}

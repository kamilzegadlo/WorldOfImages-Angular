import { browser, by, element, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppPage } from './app.po';


export class NotDefinedPlacePage extends AppPage {

  getNotDefinedLabel(): ElementFinder{
    return element(by.id('notDefinedLabel'));
  }

  getNotDefinedNameInput(): ElementFinder{
    return element(by.id('newPlaceName'));
  }

  getNotDefinedSubmitButton(): ElementFinder{
    return element(by.id('saveNewPlace'));
  }
  
}

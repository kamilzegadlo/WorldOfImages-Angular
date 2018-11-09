import { by, element, ElementFinder } from 'protractor';
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

  getClosePlaceButton(): ElementFinder{
    return element(by.css('.place__close'));
  }

  getPlace(): ElementFinder{
    return element(by.id('place'));
  }

}

import { by, element, ElementFinder } from 'protractor';
import { PlacePage } from './place.po';

export class NotDefinedPlacePage extends PlacePage {

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

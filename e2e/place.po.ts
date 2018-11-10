import { by, element, ElementFinder } from 'protractor';
import { AppPage } from './app.po';

export abstract class PlacePage extends AppPage {

  getClosePlaceButton(): ElementFinder{
    return element(by.css('.place__close'));
  }

  getPlace(): ElementFinder{
    return element(by.id('place'));
  }

}

import { DefinedPlacePage } from './definedPlace.po';
import { NotDefinedPlacePage } from './notDefinedPlace.po';

import { ElementFinder } from 'protractor';

describe('world-of-images-angular Defined Place. ', () => {
  let definedPlacePage: DefinedPlacePage;
  let notDefinedPlacePage: NotDefinedPlacePage;

  beforeEach(() => {
    definedPlacePage = new DefinedPlacePage();
    notDefinedPlacePage= new NotDefinedPlacePage();
  });

  it('Newly added Place. After adding a place proper label, icon, message should be displayed and no images. The message should disaprear after some time.', () => {
    definedPlacePage.navigateTo();
    definedPlacePage.clickSpecifPlaceOnTheMap(113,13);

    let notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, "Test Name")
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    let userMessage: ElementFinder = definedPlacePage.getUserMessage();
    expect(definedPlacePage.isElementPresent(userMessage)).toBeTruthy();
    expect(userMessage.getText()).toBe('You have named this place!');
    expect(definedPlacePage.elementDisappear(userMessage)).toBeTruthy();

    let definedPlaceName: ElementFinder= definedPlacePage.getDefinedPlaceName();
    expect(definedPlacePage.isElementPresent(definedPlaceName)).toBeTruthy();
    expect(definedPlaceName.getText()).toBe('Test Name (x:113 y:13)');

    definedPlacePage.getImages().then(i=>expect(i.length).toBe(0));
  });

});

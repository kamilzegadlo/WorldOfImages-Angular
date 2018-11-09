import { ElementFinder } from 'protractor';

import { NotDefinedPlacePage } from './notDefinedPlace.po';


describe('world-of-images-angular Not Defined Place ', () => {
  let page: NotDefinedPlacePage;

  beforeEach(() => {
    page = new NotDefinedPlacePage();
  });

  it('when click on a undefined place, a proper message, input and button should be displayed', () => {
    page.navigateTo();
    page.clickSpecifPlaceOnTheMap(113,13);

    let notDefinedLabel: ElementFinder = page.getNotDefinedLabel();
    expect(page.isElementPresent(notDefinedLabel)).toBeTruthy();
    expect(notDefinedLabel.getText()).toBe("This place has not been visited yet!");

    let notDefinedInput = page.getNotDefinedNameInput();
    expect(notDefinedInput).toBeTruthy();
    expect(notDefinedInput.getAttribute('value')).toBe("New place");
    expect(page.isElementFocused(notDefinedInput)).toBeTruthy();

    let notDefinedSubmitButton=page.getNotDefinedSubmitButton();
    expect(page.isElementPresent(notDefinedSubmitButton)).toBeTruthy();
  });

});

import { ElementFinder } from 'protractor';

import { NotDefinedPlacePage } from './notDefinedPlace.po';

describe('Not Defined Place, ', () => {
  let page: NotDefinedPlacePage;

  beforeEach(() => {
    page = new NotDefinedPlacePage();
  });

  it('when click on a undefined place, a proper message, input and button should be displayed. After clicking X, the place should collapse and the message should be displayed and disappear after some time.', () => {
    page.navigateTo();
    page.clickSpecifPlaceOnTheMap(113,13);

    let notDefinedLabel: ElementFinder = page.getNotDefinedLabel();
    expect(page.isElementPresent(notDefinedLabel)).toBeTruthy();
    expect(notDefinedLabel.getText()).toBe("This place has not been visited yet!");

    let notDefinedInput = page.getNotDefinedNameInput();
    expect(notDefinedInput).toBeTruthy();
    expect(notDefinedInput.getAttribute('value')).toBe("New place (x:113 y:13)");
    expect(page.isElementFocused(notDefinedInput)).toBeTruthy();

    let notDefinedSubmitButton=page.getNotDefinedSubmitButton();
    expect(page.isElementPresent(notDefinedSubmitButton)).toBeTruthy();

    expect(page.isElementPresent(page.getPlace())).toBeTruthy();

    page.getClosePlaceButton().click();

    let userMessage: ElementFinder = page.getUserMessage();
    expect(page.isElementPresent(userMessage)).toBeTruthy();
    expect(userMessage.getText()).toBe('Click on any place on the map!');
    expect(page.elementDisappear(userMessage)).toBeTruthy();

    expect(page.elementDisappear(page.getPlace())).toBeTruthy();
  });

  it('when click on the map when undefined place is opened it should open this new place', () => {
    page.navigateTo();
    page.clickSpecifPlaceOnTheMap(113,13);

    let notDefinedInput = page.getNotDefinedNameInput();
    expect(notDefinedInput).toBeTruthy();
    expect(notDefinedInput.getAttribute('value')).toBe("New place (x:113 y:13)");
    expect(page.isElementFocused(notDefinedInput)).toBeTruthy();

    page.clickSpecifPlaceOnTheMap(114,13);

    expect(notDefinedInput).toBeTruthy();
    expect(notDefinedInput.getAttribute('value')).toBe("New place (x:114 y:13)");
    expect(page.isElementFocused(notDefinedInput)).toBeTruthy();

  });

});

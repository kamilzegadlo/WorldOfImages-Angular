import { ElementFinder } from 'protractor';

import { DefinedPlacePage } from './definedPlace.po';
import { NotDefinedPlacePage } from './notDefinedPlace.po';

describe('Defined Place. ', () => {
  let definedPlacePage: DefinedPlacePage;
  let notDefinedPlacePage: NotDefinedPlacePage;

  beforeEach(() => {
    definedPlacePage = new DefinedPlacePage();
    notDefinedPlacePage = new NotDefinedPlacePage();
  });

  it('Newly added Place. After adding a place proper label, icon, message should be displayed and no images. The message should disapear after some time.', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(113,13);

    const notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, "Test Name")
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    const userMessage: ElementFinder = definedPlacePage.getUserMessage();
    expect(definedPlacePage.isElementPresent(userMessage)).toBeTruthy();
    expect(userMessage.getText()).toBe('You have named this place!');
    expect(definedPlacePage.elementDisappear(userMessage)).toBeTruthy();

    const definedPlaceName: ElementFinder= definedPlacePage.getDefinedPlaceName();
    expect(definedPlacePage.isElementPresent(definedPlaceName)).toBeTruthy();
    expect(definedPlaceName.getText()).toBe('Test Name');

    definedPlacePage.getImages().then(i=>expect(i.length).toBe(0));
  });

  it('Enter should submit the form. After adding an image proper message and image should be displayed. The message should disapear after some time.', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(113,13);

    const notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.submit(notDefinedNameInput, "Test Name")

    definedPlacePage.getDefinedFileInput().sendKeys(__dirname+'\\assets\\1.jpg');

    const userMessage: ElementFinder = definedPlacePage.getUserMessage();
    expect(definedPlacePage.isElementPresent(userMessage)).toBeTruthy();
    expect(userMessage.getText()).toBe('Your picture has been added to this place!');
    expect(definedPlacePage.elementDisappear(userMessage)).toBeTruthy();

    definedPlacePage.getImages().then(i=>{expect(i.length).toBe(1);});
  });

  it('An image should be expanded after clicking it. The expanded image should collapse after another click on the small image or clicking X', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(113,13);

    const notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, "Test Name")
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    definedPlacePage.getDefinedFileInput().sendKeys(__dirname+'\\assets\\1.jpg');

    definedPlacePage.getFirstImage().click()

    const expandedImage: ElementFinder = definedPlacePage.getExpandedImage();
    expect(definedPlacePage.isElementPresent(expandedImage)).toBeTruthy();
    definedPlacePage.getCloseExpandedImageButton().click();
    expect(definedPlacePage.elementDisappear(expandedImage)).toBeTruthy();

    definedPlacePage.getFirstImage().click();
    expect(definedPlacePage.isElementPresent(expandedImage)).toBeTruthy();
    definedPlacePage.getFirstImage().click();
    expect(definedPlacePage.elementDisappear(expandedImage)).toBeTruthy();
  });

  it('add 2 images by bulk and reopen this place.', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(113, 13);

    const notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, 'Test Name')
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    definedPlacePage.getDefinedFileInput().sendKeys(__dirname+'\\assets\\1.jpg\n'+__dirname+'\\assets\\2.jpg');

    definedPlacePage.waitUntilThereAreNImages(2);
    definedPlacePage.getImages().then(i=>{expect(i.length).toBe(2);});

    definedPlacePage.getClosePlaceButton().click();
    expect(definedPlacePage.elementDisappear(definedPlacePage.getPlace())).toBeTruthy();

    definedPlacePage.clickSpecifPlaceOnTheMap(113, 13);
    const definedPlaceName: ElementFinder = definedPlacePage.getDefinedPlaceName();
    expect(definedPlacePage.isElementPresent(definedPlaceName)).toBeTruthy();
    expect(definedPlaceName.getText()).toBe('Test Name');
    definedPlacePage.waitUntilThereAreNImages(2);
    definedPlacePage.getImages().then(i=>{expect(i.length).toBe(2);});
  });

});

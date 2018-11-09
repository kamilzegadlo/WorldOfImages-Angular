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

  it('Newly added Place. After adding a place proper label, icon, message should be displayed and no images. The message should disapear after some time.', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(113,13);

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

  it('After adding an image proper message and image should be displayed. The message should disapear after some time. No image should be expanded.', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(114,13);

    let notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, "Test Name")
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    definedPlacePage.getDefinedFileInput().sendKeys(__dirname+'\\assets\\1.jpg');

    let userMessage: ElementFinder = definedPlacePage.getUserMessage();
    expect(definedPlacePage.isElementPresent(userMessage)).toBeTruthy();
    expect(userMessage.getText()).toBe('Your picture has been added to this place!');
    expect(definedPlacePage.elementDisappear(userMessage)).toBeTruthy();

    definedPlacePage.getImages().then(i=>{expect(i.length).toBe(1);});
  });

  it('An image should be expanded after clicking it. The expanded image should collapse after another click on the small image or clicking X', () => {
    notDefinedPlacePage.navigateTo();
    notDefinedPlacePage.clickSpecifPlaceOnTheMap(115,13);

    let notDefinedNameInput = notDefinedPlacePage.getNotDefinedNameInput();
    notDefinedPlacePage.setValue(notDefinedNameInput, "Test Name")
    notDefinedPlacePage.getNotDefinedSubmitButton().click();

    definedPlacePage.getDefinedFileInput().sendKeys(__dirname+'\\assets\\1.jpg');

    definedPlacePage.getFirstImage().click()

    let expandedImage: ElementFinder = definedPlacePage.getExpandedImage();
    expect(definedPlacePage.isElementPresent(expandedImage)).toBeTruthy();
    definedPlacePage.getCloseExpandedImageButton().click()
    expect(definedPlacePage.elementDisappear(expandedImage)).toBeTruthy();

    definedPlacePage.getFirstImage().click()
    expect(definedPlacePage.isElementPresent(expandedImage)).toBeTruthy();
    definedPlacePage.getFirstImage().click()
    expect(definedPlacePage.elementDisappear(expandedImage)).toBeTruthy();
  });

});

import { AppPage } from './app.po';

describe('world-of-images-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a map and a message on init. The message should dissapear after some time.', () => {
    page.navigateTo();
    let map=page.getMap();
    expect(page.isElementPresent(map)).toBeTruthy();

    let userMessage=page.getUserMessage();
    expect(page.isElementPresent(userMessage)).toBeTruthy();

    expect(userMessage.getText()).toBe('Click on any place on the map!');
    
    expect(page.elementDisappear(userMessage)).toBeTruthy();
  });


  /*

E2e tests:

->2.
Click on any element and ensure the correct label, input and button is visible
Define place
Ensure a proper message is displayed
And it disappears after 15 sec
->3.
Ensure proper label and icon is displayed and no images
->4
Add an image
Ensure message is and disappears
Image is displayed
->5.
Extend the image
Close the extended by clicking the image again
->6.
Extend it again
Close by clicking the X
->7.
add multiple images by bulk
Ensure they are displayed
->8.
add more than 5 images
->9.
Click on already defined place
->10.
Close a place by clicking x
Ensure the label is displayed and disappears
-> 11. 
Click on the map when a place is opened(defined and not defined)


  */

});

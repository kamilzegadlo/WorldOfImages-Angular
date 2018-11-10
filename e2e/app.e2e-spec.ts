import { AppPage } from './app.po';
import { ElementFinder } from 'protractor';

describe('world-of-images-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Init State. Should display a map and a message on init. The message should disappear after some time.', () => {
    page.navigateTo();
    let map: ElementFinder = page.getMap();
    expect(page.isElementPresent(map)).toBeTruthy();

    let userMessage: ElementFinder = page.getUserMessage();
    expect(page.isElementPresent(userMessage)).toBeTruthy();

    expect(userMessage.getText()).toBe('Click on any place on the map!');
    
    expect(page.elementDisappear(userMessage)).toBeTruthy();
  });

  /*

E2e tests:

-> 11. 
Click on the map when a place is opened(defined and not defined)
->12
check that enter submits form in not defined place
  */

});

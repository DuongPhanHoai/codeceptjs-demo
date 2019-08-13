const homePage = require('../pages/home')
const pfgInfo = require ('../data/pfg.json');

Feature('Make sure Server is ready');

Scenario('Wait for Server ready', { retries: 100, minTimeout: 60000 }, (I) => {
  I.amOnPage(pfgInfo.address);
  homePage.checkIconAppear();
});
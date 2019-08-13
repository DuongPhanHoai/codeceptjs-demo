const homePage = require('../../pages/home')
const loginPage = require('../../pages/login');

Feature('Login failures');

// Open the site first
Before((I) => {
  homePage.launchPageToLogin();
});

Scenario('Enter username only', (I) => {
  loginPage.enterUserPass('OnlyName', '');
  loginPage.verifyBtnLoginStatus(false);
}).tag('@regression');
Scenario('Enter username only as special chars', (I) => {
  loginPage.enterUserPass(`~!@#$%^&*()-_=+[]\\{}|;;""''/?<>,.`, '');
  loginPage.verifyBtnLoginStatus(false);
}).tag('@regression');
Scenario('Enter password only', (I) => {
  loginPage.enterUserPass('', 'OnlyPass');
  loginPage.verifyBtnLoginStatus(false);
}).tag('@regression');
Scenario('Enter password only as special chars', (I) => {
  loginPage.enterUserPass('', `~!@#$%^&*()-_=+[]\\{}|;;""''/?<>,.`, '');
  loginPage.verifyBtnLoginStatus(false);
}).tag('@regression');

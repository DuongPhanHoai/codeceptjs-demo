const homePage = require('../../pages/home')
const loginPage = require('../../pages/login');

Feature('Login successful');

// Open the site first
Before((I) => {
  homePage.launchPageToLogin();
});


Scenario('Enter user/pass and see SignIn button enable', (I) => {
  loginPage.enterUserPass(loginPage.fields.email, loginPage.fields.pwd);
  loginPage.verifyBtnLoginStatus(true);
}).tag('@regression');

Scenario('Signin successful', (I) => {
  loginPage.userSignIn(loginPage.fields.email, loginPage.fields.pwd);
  homePage.seeMenuSetting();
}).tag('@regression').tag('@smoke');

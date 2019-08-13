const homePage = require('../../pages/home')
const loginPage = require('../../pages/login');
const customerList = require('../../pages/customers/list');
const customerDetail = require('../../pages/customers/detail');
const customerDetailData = require('../../data/customers.json');

Feature('Customers');

// Open the site first
Before((I) => {
  homePage.launchPageToLogin();
  loginPage.userSignIn(loginPage.fields.email, loginPage.fields.pwd);
  homePage.clickMenuCustomers();
});

After((I) => {
});

Scenario('Check customer information', (I) => {
  customerList.clickViewDetailByName(customerDetailData.name);
  customerDetail.verifyCustomer(customerDetailData.street, customerDetailData.town, customerDetailData.state, customerDetailData.zipcode, customerDetailData.tel, customerDetailData.dateOfBirth, customerDetailData.gender, customerDetailData.accomodation, customerDetailData.contacttype);
}).tag('@regression').tag('@smoke');

Scenario('Switch customer status', (I) => {
  // Accept
  customerList.clickViewDetailByName(customerDetailData.name);
  customerDetail.clickAccept();
  homePage.clickMenuCustomers();
  customerList.verifyStatus(customerDetailData.name, 'Accepted');
  // Reject
  customerList.clickViewDetailByName(customerDetailData.name);
  customerDetail.clickReject()
  homePage.clickMenuCustomers();
  customerList.verifyStatus(customerDetailData.name, 'Rejected');
  // Inactive
  customerList.clickViewDetailByName(customerDetailData.name);
  customerDetail.clickInactive();
  homePage.clickMenuCustomers();
  customerList.verifyStatus(customerDetailData.name, 'Inactive');
  // Accept
  customerList.clickViewDetailByName(customerDetailData.name);
  customerDetail.clickAccept();
  homePage.clickMenuCustomers();
  customerList.verifyStatus(customerDetailData.name, 'Accepted');/***/
}).tag('@regression').tag('@smoke');
const { I } = inject();
const pfgInfo = require ('../data/pfg.json');

module.exports = {
  iconPantryForGood: 'Pantry for Good',
  btnSignUp: 'Sign Up',
  btnSignIn: 'Sign In',
  mnuCustomers: 'Customers',
  mnuSetting: 'Settings',

  launchPageToLogin() {
    I.amOnPage(pfgInfo.address);
    this.checkIconAppear();
    this.clickSignIn();
  },

  // Function
  checkIconAppear() {
    I.see(this.iconPantryForGood);
  },
  clickSignUp() {
    I.click(this.btnSignUp);
  },
  clickSignIn() {
    I.click(this.btnSignIn);
  },
  seeMenuSetting() {
    I.see(this.mnuSetting);
  },
  clickMenuCustomers() {
    I.click(this.mnuCustomers);
  }
}

const assert = require('assert');
const { I } = inject();

module.exports = {  // Page object
  // Data
  fields: {
    email: 'admin@example.com',
    pwd: 'password'
  },

  // Objects
  txtEmail: 'email',
  txtPassword: 'password',
  lblInvalidUserPassword: 'Unknown user or invalid password',
  btnSignIn: `//button[contains(@class, 'btn btn-primary btn-flat') and not (@disabled)]`,
  btnSignInDisabled: `//button[contains(@class, 'btn btn-primary btn-flat') and (@disabled)]`,
  btnSignUn: 'Sign un',

  /**
   * User login to system
   * @param {string} user email
   * @param {string} user password
  */
  userSignIn(userEmail, userPassword) {
    I.fillField(this.txtEmail, userEmail);
    I.fillField(this.txtPassword, userPassword);
    I.click(this.btnSignIn);
  },

  /**
   * Enter username / password, (not include clicking Login)
   * @param {string} user email
   * @param {string} user password
  */
  enterUserPass(userEmail, userPassword) {
    I.fillField(this.txtEmail, userEmail);
    I.fillField(this.txtPassword, userPassword);
  },

  /**
   * Verify Login button status
   * @param {bool} true = enable, false = disable
  */
  verifyBtnLoginStatus(checkingStatus) {
    if (checkingStatus)
      I.waitForElement(this.btnSignIn, 15);
    else
      I.waitForElement(this.btnSignInDisabled, 15);
  }
}
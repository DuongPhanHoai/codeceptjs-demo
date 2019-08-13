const { I } = inject();

module.exports = {
  clickViewDetailByName (customerName) {
    const btnViewCustomer = `//td[contains(text(), '${customerName}')]/..//a[contains(@class, 'btn btn-info btn-sm')]`;
    I.waitForElement(btnViewCustomer, 15);
    I.click(btnViewCustomer);
  },
  clickEditByName (customerName) {
    const btnEditCustomer = `//td[contains(text(), '${customerName}')]/..//a[contains(@class, 'btn btn-primary btn-sm')]`;
    I.waitForElement(btnEditCustomer, 15);
    I.click(btnEditCustomer);
  },
  verifyStatus (customerName, status = 'Inactive') {
    if (status === 'Accepted') {
      const lblAcceptState = `//td[contains(text(), '${customerName}')]/..//span[contains(@class, 'label label-success') and contains(text(), 'Accepted')]`;
      I.retry(3).seeElement(lblAcceptState);
    }
    else if (status === 'Rejected') {
      const lblRejectState = `//td[contains(text(), '${customerName}')]/..//span[contains(@class, 'label label-danger') and contains(text(), 'Rejected')]`;
      I.see(lblRejectState);
    }
    else { // check as Inactive
      const lblInactiveState = `//td[contains(text(), '${customerName}')]/..//span[contains(@class, 'label label-warning') and contains(text(), 'Inactive')]`;
      I.see(lblInactiveState);
    }
  }
}
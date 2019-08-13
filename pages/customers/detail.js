const { I } = inject();

module.exports = {
  lblStreet: `//strong[contains(text(), 'Street')]/../span`,
  lblTown: `//strong[contains(text(), 'Town/City')]/../span`,
  lblState: `//strong[contains(text(), 'State/Province')]/../span`,

  lblZip: `//strong[contains(text(), 'Zip/Post')]/../span`,
  lblTel: `//strong[contains(text(), 'Telephone Number')]/../span`,
  lblBirth: `//strong[contains(text(), 'Date of Birth')]/../span`,

  lblGender: `//strong[contains(text(), 'Gender')]/../span`,
  lblAccommodation: `//strong[contains(text(), 'Accommodation Type')]/../span`,
  lblContactType: `//strong[contains(text(), 'Best way to contact')]/../span`,

  // Status
  btnStatusAccept: "//button[contains(@class, 'btn btn-success active') and contains(text(), 'Accept')]",
  btnStatusReject: "//button[contains(@class, 'btn btn-danger') and contains(text(), 'Reject')]",
  btnStatusInactive: "//button[contains(@class, 'btn btn-warning') and contains(text(), 'Inactive')]",

  // Modify
  btnDelete: 'Delete',
  btnEdit: 'Edit',
  btnCancel: 'Cancel',

  verifyCustomer(street, town, state, zipcode, tel, dateOfBirth, gender, accomodation, contacttype) {
    I.waitForElement(this.lblStreet, 15);
    if (street)
      I.see(street, this.lblStreet);
    if (town)
      I.see(town, this.lblTown);
    if (state)
      I.see(state, this.lblState);
    if (zipcode)
      I.see(zipcode, this.lblZip);
    if (tel)
      I.see(tel, this.lblTel);
    if (dateOfBirth)
      I.see(dateOfBirth, this.lblBirth);
    if (gender)
      I.see(gender, this.lblGender);
    if (accomodation)
      I.see(accomodation, this.lblAccommodation);
    if (contacttype)
      I.see(contacttype, this.lblContactType);
  },
  clickAccept() {
    I.click(this.btnStatusAccept);
  },
  clickReject(){
    I.click(this.btnStatusReject);
  },
  clickInactive(){
    I.click(this.btnStatusInactive);
  }
}
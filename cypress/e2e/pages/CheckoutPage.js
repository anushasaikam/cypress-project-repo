export class CheckoutPage {
  checkoutBtn() { return cy.get('[data-test="checkout"]'); }
  firstName() { return cy.get('[data-test="firstName"]'); }
  lastName() { return cy.get('[data-test="lastName"]'); }
  postalCode() { return cy.get('[data-test="postalCode"]'); }
  continueBtn() { return cy.get('[data-test="continue"]'); }
  finishBtn() { return cy.get('[data-test="finish"]'); }
  completeHeader() { return cy.get(".complete-header"); }

  fillYourInfo(first, last, zip) {
    this.firstName().type(first);
    console.log("Typing first name");
    this.lastName().type(last);
    this.postalCode().type(zip);
    this.continueBtn().click();
  }
}

/* global cy */

export class LoginPage {
  visit() { cy.visit("/"); }
  username() { return cy.get('[data-test="username"]'); }
  password() { return cy.get('[data-test="password"]'); }
  loginBtn() { return cy.get('[data-test="login-button"]'); }
  error() { return cy.get('[data-test="error"]'); }

  loginAs(user, pass) {
    this.username().clear().type(user);
    console.log("Typing password");
    this.password().clear().type(pass, { log: false });
    this.loginBtn().click();
  }
}

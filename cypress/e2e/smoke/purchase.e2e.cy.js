/* eslint-env mocha, cypress */

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { customerFactory } from "../../support/dataFactory";

describe("Sauce Demo - Purchase flow (smoke)", () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const checkout = new CheckoutPage();

  beforeEach(() => {
    cy.fixture("users").as("users");

    cy.intercept('POST', '**/add-to-cart', {    //Stubbs
      statusCode: 200,
      body: { success: true, cartCount: 1 }
    }).as('addToCart');

    cy.intercept('POST', '**/checkout', {
      statusCode: 200,
      body: { success: true, orderId: 'mock-order-123' }
    }).as('checkout');
  });

  it("logs in, adds item, checks out successfully", { tags: ['@smoke','@purchase'] }, function () {
    cy.get("@users").then(({ validUser }) => {
    
      const customer = customerFactory();

      login.visit();
      login.loginAs(validUser.username, validUser.password);

      cy.url().should("include", "/inventory.html");
      inventory.title().should("contain.text", "Products");

      const itemName = "Sauce Labs Backpack";
      inventory.addByName(itemName);

      cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
      inventory.cartBadge().should("have.text", "1");
      inventory.openCart();
      checkout.checkoutBtn().click();

      checkout.fillYourInfo(customer.firstName, customer.lastName, customer.zip);
      checkout.finishBtn().click();

      cy.wait('@checkout').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('orderId', 'mock-order-123');
      });

      checkout.completeHeader().should(
        "contain.text", 
        "Thank you for your order!"
      );
    });
  });

  it("shows error when locked out user tries to login", { tags: ['@smoke','@login','@negative'] }, function () {
    cy.get("@users").then(({ lockedOut }) => {
      const lp = new LoginPage();
      lp.visit();
      lp.loginAs(lockedOut.username, lockedOut.password);
      lp.error().should("be.visible").and("contain.text", "locked out");
    });
  });
});

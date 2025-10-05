export class InventoryPage {
  title() { return cy.get(".title"); }
  cartBadge() { return cy.get(".shopping_cart_badge"); }
  openCart() { return cy.get(".shopping_cart_link").click(); }
  addByName(name) {
    cy.contains(".inventory_item", name).find("button").click();
  }
}

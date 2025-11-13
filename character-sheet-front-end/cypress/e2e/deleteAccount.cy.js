describe("Delete Account Flow", () => {
    it("logs in, opens settings, deletes the account", () => {
      cy.visit("http://localhost:5173"); // or your VM URL
  
      // LOGIN
      cy.contains("Login").click();
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("pass1234");
      cy.contains("button", /login/i).click();
  
      // open settings menu
      cy.get('[aria-label="Settings"]').click();
      cy.contains(/delete account/i).click();
  
      // type confirmation
      cy.get("#confirm-delete").type("DELETE ACCOUNT");
  
      // delete
      cy.contains("Delete My Account").click();
  
      // verify logout
      cy.contains("Login");
    });
});
  
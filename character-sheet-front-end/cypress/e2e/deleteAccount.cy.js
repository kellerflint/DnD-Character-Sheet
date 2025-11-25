describe("Delete Account Flow", () => {
    it("logs in, opens settings, deletes the account", () => {

      cy.intercept("POST", "**/register").as("registerRequest");

      cy.visit("/"); 
  
      const timestamp = Date.now();
      const email = `delete${timestamp}@test.com`;
      const password = "pass1234";
      
      cy.contains("Register").click();
      cy.get("#username").type(`del${timestamp}`);
      cy.get("#firstName").type("Delete");
      cy.get("#lastName").type("Me");
      cy.get("#email").type(email);
      cy.get("#password").type(password);
      cy.get("#securityQuestionId").click();
      cy.contains("What is the name of your first pet?").click();
      cy.get("#securityAnswer").type("fluffy");
      cy.get(".register-button").click();

      cy.wait("@registerRequest");

      cy.contains("button", /login/i).should("be.visible");

      cy.get("#email").type(email);
      cy.get("#password").type(password);
      
      cy.contains("button", /login/i).click({ force: true });
  
      cy.get('[aria-label="Settings"]', { timeout: 10000 }).should("be.visible").click();
      
      cy.contains(/delete account/i).click();
  
      cy.get("#confirm-delete").type("DELETE ACCOUNT");
  
      cy.contains("Delete My Account").click();
  
      cy.contains("Login").should("be.visible");
    });
});
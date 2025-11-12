describe("User Account Deletion Flow", () => {
  const uniqueId = Date.now();
  const testUser = {
    username: `deleteuser_${uniqueId}`,
    firstName: "Joe",
    lastName: "Tester",
    email: `delete_${uniqueId}@mail.com`,
    password: "Password123!",
    securityAnswer: "fluffy",
  };

  it("Deletes an existing user after logging in", () => {
    // Register the test user first
    cy.visit("/");
    cy.get('[data-cy="open-register-modal"]').click();
    cy.get('[data-cy="register-username-input"]').type(testUser.username);
    cy.get('[data-cy="register-firstName-input"]').type(testUser.firstName);
    cy.get('[data-cy="register-lastName-input"]').type(testUser.lastName);
    cy.get('[data-cy="register-email-input"]').type(testUser.email);
    cy.get('[data-cy="register-password-input"]').type(testUser.password);
    cy.get('[data-cy="register-confirmPassword-input"]').type(testUser.password);
    cy.get('[data-cy="register-security-question-select"]').click();
    cy.contains("What is the name of your first pet?").click();
    cy.get('[data-cy="register-security-answer-input"]').type(testUser.securityAnswer);
    cy.get('[data-cy="register-submit-button"]').click();
    cy.get('[data-cy="register-success-message"]', { timeout: 10000 })
      .should("contain.text", "Success");

    // Login the user
    cy.get('[data-cy="login-email-input"]').type(testUser.email);
    cy.get('[data-cy="login-password-input"]').type(testUser.password);
    cy.get('[data-cy="login-submit-button"]').click();

    // Wait until user is authenticated and settings button is visible
    cy.contains(`Welcome, ${testUser.username}!`, { timeout: 10000 }).should("exist");
    cy.get('[data-cy="settings-menu-button"]').should("be.visible").click();

    // Open the delete dialog
    cy.get('[data-cy="open-delete-dialog"]').click();

    // Confirm and delete the account
    cy.get('[data-cy="confirm-delete-input"]').type("DELETE ACCOUNT");
    cy.get('[data-cy="confirm-delete-button"]').click();

    // Verify the user is logged out
    cy.contains("Please log in to save your character.", { timeout: 10000 }).should("exist");
  });
});

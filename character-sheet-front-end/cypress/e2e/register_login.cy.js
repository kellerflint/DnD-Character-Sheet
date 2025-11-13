describe("User Registration and Login Flow", () => {
  // Generate a unique user each test run to avoid duplicate conflicts
  const uniqueId = Date.now();
  const testUser = {
    username: `testuser_${uniqueId}`,
    firstName: "Joe",
    lastName: "Tester",
    email: `test_${uniqueId}@mail.com`,
    password: "Password123!",
    securityAnswer: "fluffy",
  };

  it("Registers a new user and then logs in successfully", () => {
    // Visit the app and open the user registration form
    cy.visit("/");
    cy.get('[data-cy="open-register-modal"]').should("be.visible").click();

    // Fill out the registration form and submit
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

    // Verify registration success message
    cy.get('[data-cy="register-success-message"]', { timeout: 10000 })
      .should("contain.text", "Success");

    // Login with the new account
    cy.get('[data-cy="login-email-input"]').should("be.visible");
    cy.get('[data-cy="login-email-input"]').type(testUser.email);
    cy.get('[data-cy="login-password-input"]').type(testUser.password);
    cy.get('[data-cy="login-submit-button"]').click();

    // Confirm successful authentication after login
    cy.contains(`Welcome, ${testUser.username}!`, { timeout: 10000 }).should("exist");
  });
});

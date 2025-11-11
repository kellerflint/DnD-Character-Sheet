describe('User Signup', () => {
    beforeEach(() => {
        cy.visit('/');

        // ignore error about failed to execute 'insertBefore'
        // this error is caused by the dialog being opened and closed quickly (DOM re-rendering)
        Cypress.on('uncaught:exception', (err) => {
          if (err.message.includes("Failed to execute 'insertBefore'")) {
            return false;
          }
        });
      });

    it('should successfully register a new user', () => {

        // unique username and email to avoid conflicts in database
        const timestamp = Date.now();
        const username = `testuser${timestamp}`;
        const email = `testuser${timestamp}@example.com`;
        cy.contains('Register').click();

        // fill out the registration form
        cy.get('#username').type(username);
        cy.get('#firstName').type('Test');
        cy.get('#lastName').type('User');
        cy.get('#email').type(email);
        cy.get('#password').type('TestPassword123!');

        cy.get('#securityQuestionId').click();
        cy.contains('What is the name of your first pet?').click();

        cy.get('#securityAnswer').type('Fluffy');

        cy.get('.register-button').click();

        // verify success message appears after registration
        cy.contains('Success! Redirecting to login...', { timeout: 10000 }).should('be.visible');
    });
});


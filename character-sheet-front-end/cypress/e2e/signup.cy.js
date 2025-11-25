describe('User Signup', () => {
    beforeEach(() => {

        cy.intercept('POST', '**/register', {
            statusCode: 201,
            body: { message: 'User created successfully' }
        }).as('signupRequest');

        cy.visit('/');
        Cypress.on('uncaught:exception', () => false);
    });

    it('Should successfully register a new user', () => {
        cy.contains('Register').click();

        cy.get('#username').type('mockuser');
        cy.get('#firstName').type('Test');
        cy.get('#lastName').type('User');
        cy.get('#email').type('mock@example.com');
        cy.get('#password').type('TestPassword123!');

        cy.get('#securityQuestionId').click();
        cy.contains('What is the name of your first pet?').click();
        cy.get('#securityAnswer').type('Fluffy');

        cy.get('.register-button').click();

        cy.wait('@signupRequest');

        cy.contains('Success! Redirecting to login.', { timeout: 10000 }).should('be.visible');
    });
});
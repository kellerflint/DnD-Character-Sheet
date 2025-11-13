describe('User Login', () => {
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

    it('should successfully log in an existing user', () => {
        // CREATE TEST USER IN DATABASE FIRST
        const email = 'testuser@example.com';
        const password = 'TestPassword123!';

        cy.contains('Login').click();

        cy.get('#email').type(email);
        cy.get('#password').type(password);

        // submit the form
        cy.get('button[type="submit"]').contains('Login').click();

        // verify modal closed after successful login
        cy.get('#email').should('not.exist');

    });

    it('should show error message for invalid credentials', () => {
        const email = 'wronguser@test.com';
        const password = 'WrongPassword123!';

        cy.contains('Login').click();

        // fill out the login form with invalid credentials
        cy.get('#email').type(email);
        cy.get('#password').type(password);

        cy.get('button[type="submit"]').contains('Login').click();

        // Verify error message appears
        cy.contains('Login failed. Please check your email and password.').should('be.visible');
    });
});

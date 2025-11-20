describe('User Login', () => {
    beforeEach(() => {

        cy.intercept('POST', '**/login', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-token',
                user: { id: 1, email: 'testuser@example.com' }
            }
        }).as('loginRequest');

        cy.visit('/');

        Cypress.on('uncaught:exception', () => false);
    });

    it('Should successfully log in', () => {
        cy.contains('Login').click();
        cy.get('#email').type('testuser@example.com');
        cy.get('#password').type('TestPassword123!');

        cy.get('button[type="submit"]').contains('Login').click();


        cy.wait('@loginRequest');


        cy.get('#email').should('not.exist');
    });

    it('Should show error message for invalid credentials', () => {

        cy.intercept('POST', '**/login', {
            statusCode: 401,
            body: { message: 'Invalid credentials' }
        }).as('loginFail');

        cy.contains('Login').click();
        cy.get('#email').type('wrong@test.com');
        cy.get('#password').type('WrongPass!');
        cy.get('button[type="submit"]').contains('Login').click();

        cy.wait('@loginFail');

        cy.contains('Login failed. Please check your email and password.').should('be.visible');
    });
});
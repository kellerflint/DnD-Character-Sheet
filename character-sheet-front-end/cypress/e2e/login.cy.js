describe('User Login', () => {
    const testUser = {
        username: 'logintest',
        firstName: 'Login',
        lastName: 'Test',
        email: 'logintest@example.com',
        password: 'TestPassword123!',
        securityAnswer: 'fluffy'
    };

    beforeEach(() => {
        cy.request('POST', '/api/register', testUser).then((response) => {
            expect(response.status).to.be.oneOf([201, 409]);
        });

        cy.visit('/');
    });

    it('should successfully log in an existing user', () => {
        cy.contains('Login').click();

        cy.get('#email').type(testUser.email);
        cy.get('#password').type(testUser.password);

        cy.get('button[type="submit"]').contains('Login').click();

        cy.get('#email').should('not.exist');
    });

    it('should show error message for invalid credentials', () => {
        const email = 'wronguser@test.com';
        const password = 'WrongPassword123!';

        cy.contains('Login').click();
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').contains('Login').click();

        cy.contains('Login failed. Please check your email and password.').should('be.visible');
    });
});
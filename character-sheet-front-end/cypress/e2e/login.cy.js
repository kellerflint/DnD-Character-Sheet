describe('User Login', () => {
    let testUser;

    beforeEach(() => {
        const uniqueId = Date.now();
        testUser = {
            username: `login${uniqueId}`,
            firstName: 'Login',
            lastName: 'Test',
            email: `login${uniqueId}@example.com`,
            password: 'TestPassword123!',
            securityAnswer: 'fluffy'
        };

        cy.request('POST', '/api/register', testUser).then((response) => {
            expect(response.status).to.eq(201);
        });

        cy.visit('/');
    });

    it('should successfully log in an existing user', () => {
        cy.contains('Login').should('be.visible').click();

        cy.get('#email').should('be.visible').type(testUser.email);
        cy.get('#password').type(testUser.password);

        cy.get('button[type="submit"]').contains('Login').click();

        cy.get('#email').should('not.exist');
    });

    it('should show error message for invalid credentials', () => {
        const email = `wrong${Date.now()}@test.com`;
        const password = 'WrongPassword123!';

        cy.contains('Login').should('be.visible').click();
        cy.get('#email').should('be.visible').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').contains('Login').click();

        cy.contains('Login failed. Please check your email and password.').should('be.visible');
    });
});
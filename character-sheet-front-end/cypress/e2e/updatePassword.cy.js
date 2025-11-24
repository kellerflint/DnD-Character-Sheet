describe('Update Password', () => {
    let testUser;

    beforeEach(() => {
        const uniqueId = Date.now();
        testUser = {
            username: `update${uniqueId}`,
            firstName: 'Update',
            lastName: 'Test',
            email: `update${uniqueId}@example.com`,
            password: 'OldPassword123!',
            securityAnswer: 'fluffy'
        };

        cy.request('POST', '/api/register', testUser).then((resp) => {
            expect(resp.status).to.eq(201);
        });
        cy.visit('/');
    });

    it('should successfully update password', () => {
        const newPassword = 'NewPassword12345';

        cy.contains('Login').should('be.visible').click();
        cy.contains('Forgot Password?').should('be.visible').click();

        cy.get('#email').should('be.visible').type(testUser.email);
        
        cy.get('#securityQuestionId').click();
        cy.contains('What is the name of your first pet?').click();
        
        cy.get('#securityAnswer').type(testUser.securityAnswer);
        
        cy.get('#newPassword').type(newPassword);
        cy.get('#confirmPassword').type(newPassword);

        cy.get('button[type="submit"]').contains('Update Password').click();

        cy.contains('Password updated successfully', { matchCase: false }).should('be.visible');
    });
});
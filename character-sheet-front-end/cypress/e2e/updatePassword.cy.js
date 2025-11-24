describe('Update Password', () => {
    const testUser = {
        username: 'updatetest',
        firstName: 'Update',
        lastName: 'Test',
        email: 'updatetest@example.com',
        password: 'OldPassword123!',
        securityAnswer: 'fluffy'
    };

    beforeEach(() => {
        cy.request('POST', '/api/register', testUser).then((resp) => {
            expect(resp.status).to.be.oneOf([201, 409]);
        });
        cy.visit('/');
    });

    it('should successfully update password', () => {
        const newPassword = 'NewPassword12345';

        cy.contains('Login').click();
        cy.contains('Forgot Password?').click();

        cy.get('#email').type(testUser.email);
        
        cy.get('#securityQuestionId').click();
        cy.contains('What is the name of your first pet?').click();
        
        cy.get('#securityAnswer').type(testUser.securityAnswer);
        
        cy.get('#newPassword').type(newPassword);
        cy.get('#confirmPassword').type(newPassword);

        cy.get('button[type="submit"]').contains('Update Password').click();

        cy.contains('Password updated successfully', { matchCase: false }).should('be.visible');
    });
});
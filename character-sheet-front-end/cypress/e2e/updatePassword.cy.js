describe('Update Password', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should successfully update password', () => {
        // CREATE TEST USER IN DATABASE FIRST with security question
        const email = 'testuser@example.com';
        const securityAnswer = 'fluffy';
        const newPassword = 'NewPassword12345';

        cy.contains('Login').click();
        cy.contains('Forgot Password?').click();

        cy.get('#email').type(email);
        cy.get('#securityQuestionId').click();
        cy.contains('What is the name of your first pet?').click();
        cy.get('#securityAnswer').type(securityAnswer);
        cy.get('#newPassword').type(newPassword);
        cy.get('#confirmPassword').type(newPassword);

        cy.get('button[type="submit"]').contains('Update Password').click();

        // verify success message
        cy.contains('Password updated successfully! Redirecting to login...').should('be.visible');
    });
});


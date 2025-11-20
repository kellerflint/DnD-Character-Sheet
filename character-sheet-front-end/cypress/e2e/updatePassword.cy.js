describe('Update Password', () => {
    beforeEach(() => {

        cy.intercept({ method: /POST|PUT/, url: '**/*password*' }, {
            statusCode: 200,
            body: { message: 'Password updated successfully' }
        }).as('updatePasswordReq');

        cy.visit('/');

        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes("Failed to execute 'insertBefore'")) {
                return false;
            }
        });
    });

    it('Should successfully update password', () => {
        
        const email = 'mockuser@example.com';
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

        cy.contains('Password updated successfully! Redirecting to login...', { timeout: 10000 }).should('be.visible');
    });
});
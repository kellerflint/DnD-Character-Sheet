describe("Delete Account Flow", () => {
    beforeEach(() => {

        cy.intercept('POST', '**/login', {
            statusCode: 200,
            body: { token: 'fake-token' }
        }).as('loginReq');

        cy.intercept('DELETE', '**/users/*', {
            statusCode: 200,
            body: { message: 'Deleted' }
        }).as('deleteReq');

        cy.visit("/"); 
    });

    it("Logs in, opens settings, deletes the account", () => {

        cy.contains("Login").click();
        cy.get("#email").type("test@example.com");
        cy.get("#password").type("pass1234");
        cy.contains("button", /login/i).click();
        cy.wait('@loginReq');

        cy.get('[aria-label="Settings"]').click();
        cy.contains(/delete account/i).click();

        cy.get("#confirm-delete").type("DELETE ACCOUNT");

        cy.contains("Delete My Account").click();
        cy.wait('@deleteReq');

        cy.contains("Login");
    });
});
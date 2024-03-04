
import "cypress-keycloak-commands";

describe('Testing KonnektorViewComponent', () => {
  const testUrl = Cypress.env('TEST_URL') || 'http://localhost:4200';   // defaults to this url

  before(() => {
   // cy.kcLogin("keycloak_user");
    cy.visit('http://localhost:4200');    // should come from env property
  //  cy.get('#username').should('exist').type("pisti");
   // cy.get('#password').should('exist').type("pisti");
  //  cy.get('[id="kc-login"]').should('exist').click();
  });

  // This is a sample test, modify based on your requirements
  it('should display datatable', () => {
    cy.get('[data-testid="navmenu-konnektor-view"]').should('be.visible').click();

  });

  // More tests here...

});

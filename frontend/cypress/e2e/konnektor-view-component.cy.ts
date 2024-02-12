

describe('Testing KonnektorViewComponent', () => {
  const testUrl = Cypress.env('TEST_URL') || 'http://localhost:4200';   // defaults to this url

  before(() => {
    cy.visit('http://localhost:4200');    // should come from env property

  });

  // This is a sample test, modify based on your requirements
  it('should display datatable', () => {
    cy.get('[data-testid="navmenu-konnektor-view"]').should('be.visible').click();

  });

  // More tests here...

});

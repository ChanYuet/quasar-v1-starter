describe('GENREAL: Global', () => {
  beforeEach(() => cy.logout());

  it('Try to visit Home route unauthenticated.', () => {
    cy.visit('/home').url().should('contain', 'login');
  });

  it('Check what happens if no color mode parameter exists in local storage.', () => { });

  it('Check if color mode is being set up to dark as default if it exists in local storage.', () => { });
});

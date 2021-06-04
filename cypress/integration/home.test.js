describe('Home Page',() => {

  beforeEach(() => {
    cy.visit('/');
  })

  it('should display search form',  () => {
    cy.contains('AgileSphere coding test - The Weather App');
    cy.get('form').contains('Search');
  });

  it('should form should be empty initially',  () => {
    cy.get('input').should('have.value','');
  });

  it('should display error message when empty search term',  () => {
    cy.get('form').contains('Search').click();
    cy.wait(1000);
    cy.get('li').contains('Error');
    cy.get('li').contains('Message');
  });

  it('should display results table when valid search term',  () => {
    cy.get('input').type('london');
    cy.get('form').contains('Search').click();
    cy.wait(1000);
    cy.get('td').contains('London');
  });

  it('should display error message when invalid search term',  () => {
    cy.get('input').type('NotACity');
    cy.get('form').contains('Search').click();
    cy.wait(1000);
    cy.get('li').contains('Error');
    cy.get('li').contains('Message');
  });

  it('form input should be empty after search',  () => {
    cy.get('input').type('berlin');
    cy.get('form').contains('Search').click();
    cy.get('input').should('have.value','');
  });
})

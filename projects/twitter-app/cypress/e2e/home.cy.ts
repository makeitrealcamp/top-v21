describe('Home Page', () => {
  it('Check information', () => {
    cy.visit('/');

    cy.get('[role="status"]').should('be.visible');

    cy.get('.card-body').first().as('tweet');

    cy.get('@tweet').should('not.be.empty');
    cy.get('@tweet').should('have.length', 1);
    cy.get('@tweet').find('.card-text').should('have.text', 'Vancouver');
    cy.get('@tweet').contains('Vancouver');
    cy.get('@tweet').contains(/vancouver/i);

    cy.get('@tweet')
      .find('[data-cy="likes"]')
      .find('[data-cy="count"]')
      .should('have.text', '0');

    cy.get('.navbar-nav')
      .last()
      .children()
      .first()
      .should('have.class', 'nav-link')
      .and('have.attr', 'href', '/signup');
  });
});

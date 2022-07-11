describe('Tweets', () => {
  it('get sample data', () => {
    cy.intercept('GET', '/api/v1/tweets', {
      fixture: 'tweets/sample.json',
    }).as('preload');

    cy.visit('/');
    cy.wait('@preload');

    cy.contains(/vancouver/i);
  });
});

describe('Post a tweet', function () {
  before(function () {
    cy.fixture('users/user.json').as('user');
  });

  it('should post as authenticated user', function () {
    cy.intercept('GET', '/api/v1/tweets', {
      fixture: 'tweets/sample.json',
    }).as('preload');

    cy.intercept('POST', '/api/v1/tweets', {
      statusCode: 201,
      fixture: 'tweets/new.json',
    }).as('response');

    cy.visit('/signin');

    cy.login(this.user.email, this.user.password);

    cy.wait('@preload');

    cy.get('a[href="/create"]').click();

    cy.get('textarea[name="content"]').type('Vancouver');
    cy.get('button[type="submit"]').click();

    cy.wait('@response');

    cy.contains('Vancouver');
  });
});

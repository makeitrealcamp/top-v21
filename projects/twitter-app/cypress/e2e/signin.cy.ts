describe('Sign In', function () {
  beforeEach(function () {
    cy.fixture('users/user.json').as('user');

    cy.visit('/signout');
    cy.visit('/signin');
  });

  it('with correct credentials', function () {
    cy.login(this.user.email, this.user.password);

    cy.contains(this.user.username);
  });

  it.skip('with incorrect credentials', function () {
    cy.login(this.user.email, '1234');

    cy.contains('Email or password invalid');

    cy.log('Testing aditional behaviors');
    cy.get('input[name="email"]').should('have.value', this.user.email);
    cy.get('button[type="submit"]').should('be.enabled');
    // cy.focused().clear();
  });
});

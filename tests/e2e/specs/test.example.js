// https://docs.cypress.io/api/introduction/api.html

describe('My First e2e Test', () => {
  it('Visits the app root url, loads new users and deletes one', () => {
    cy.visit('/');
    cy.contains('a', 'Load users');
    cy.get('.aqa-load-users').click();
    cy.get('.aqa-user-list');
    cy.get('.aqa-user-list-item').should('have.length', 10);
    cy.get('.aqa-user-remove')
      .first()
      .click();
    cy.get('.aqa-user-list-item').should('have.length', 9);
  });
});

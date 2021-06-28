/// <reference types="cypress" />

describe('example test app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('App was loaded and shows one dog item by default', () => {
    cy.get('.app__header')
      .should('be.visible')
      .should('have.length', 1);

    cy.get('.app__toolbar')
      .should('be.visible')
      .should('have.length', 1);

    cy.get('.app__toolbar .app__btn')
      .should('be.visible')
      .should('be.enabled')
      .should('have.length', 4);

    cy.get('.dog-list')
      .should('be.visible')
      .should('have.length', 1);

    cy.get('.dog')
      .should('be.visible')
      .should('have.length', 1);
  });


  it('App was able to add a few dogs and reset list', () => {

    cy.get('.dog-list')
      .should('be.visible');

    cy.get('.dog')
      .should('have.length', 1);

    cy.get('.cy-get-new')
      .should('be.visible')
      .click()
      .click();

    cy.get('.dog')
      .should('be.visible')
      .should('have.length', 3);

    cy.get('.cy-get-reset')
      .should('be.visible')
      .click();

    cy.get('.dog')
      .should('have.length', 0);

  })
})

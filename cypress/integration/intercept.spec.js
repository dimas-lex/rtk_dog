/// <reference types="cypress" />

describe('example test app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/api/breed/*', {
      "message": "https://images.dog.ceo/breeds/pembroke/n02113023_2567.jpg",
      "status": "success"
    });
  });

  it('cy.request() - make an XHR request', () => {
    cy.get('.app__header')
      .should('be.visible')
      .should('have.length', 1);


    cy.get('.cy-get-new')
      .should('be.visible')
      .click()
    cy.request('https://dog.ceo/api/breed/pembroke/images/random')
      .should((response) => {
        expect(response.status).to.eq(200)
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
        expect(response.body).to.have.property('status').and.be.eq("success")
        expect(response.body).to.have.property('message').and.be.contain("https://images.dog.ceo/breeds")
        // expect(response).to.have.property('headers')
        // expect(response).to.have.property('duration')
      })
  });

  it('API response with predefined response', () => {
    cy.get('.app__header')
      .should('be.visible')
      .should('have.length', 1);

    cy.intercept(
      {
        method: 'GET',
        url: '/api/breeds/image/random',
        hostname: 'dog.ceo',
      },
      {
        "message": "https://images.dog.ceo/breeds/pembroke/n02113023_2567.jpg",
        "status": "success"

      });

    cy.get('.cy-get-new')
      .should('be.visible')
      .click()
      .click()
      .click();

    cy.get('.dog')
      .should('be.visible')
      .should('have.length', 4);
  });
})

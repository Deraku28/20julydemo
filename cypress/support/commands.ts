// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.get('[data-testid="loading"]').should('not.exist');
});

// Custom command to check for accessibility
Cypress.Commands.add('checkAccessibility', () => {
  // Basic accessibility check - can be enhanced later
  cy.get('body').should('be.visible');
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
});

// Custom command to test responsive design
Cypress.Commands.add('testResponsive', () => {
  // Desktop
  cy.viewport(1280, 720);
  cy.get('h1').should('be.visible');
  
  // Tablet
  cy.viewport(768, 1024);
  cy.get('h1').should('be.visible');
  
  // Mobile
  cy.viewport(375, 667);
  cy.get('h1').should('be.visible');
}); 
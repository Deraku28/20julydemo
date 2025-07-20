/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to wait for page load
     * @example cy.waitForPageLoad()
     */
    waitForPageLoad(): Chainable<Element>
    
    /**
     * Custom command to check for accessibility
     * @example cy.checkAccessibility()
     */
    checkAccessibility(): Chainable<Element>
    
    /**
     * Custom command to test responsive design
     * @example cy.testResponsive()
     */
    testResponsive(): Chainable<Element>
  }
} 
// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Add custom commands for common operations
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to fill the interest form
       * @example cy.fillInterestForm('John Doe', 'john@example.com')
       */
      fillInterestForm(name: string, email: string): Chainable<void>;
      
      /**
       * Custom command to submit the interest form
       * @example cy.submitInterestForm()
       */
      submitInterestForm(): Chainable<void>;
      
      /**
       * Custom command to check for form validation errors
       * @example cy.checkFormValidation()
       */
      checkFormValidation(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('fillInterestForm', (name: string, email: string) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
});

Cypress.Commands.add('submitInterestForm', () => {
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('checkFormValidation', () => {
  cy.get('div').should('contain', 'Name is required');
  cy.get('div').should('contain', 'Email is required');
}); 
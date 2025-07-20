describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the page successfully', () => {
    cy.get('h1').should('contain', 'Master Rapid MVP Development');
    cy.get('form').should('be.visible');
  });

  it('displays submission counter', () => {
    cy.get('[data-testid="submission-counter"]').should('be.visible');
  });

  it('submits form successfully', () => {
    // Intercept API call
    cy.intercept('POST', '**/interest_submissions', {
      statusCode: 200,
      body: { id: '1', name: 'John Doe', email: 'john@example.com' },
    }).as('submitForm');

    // Fill form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="subscribe_updates"]').check();

    // Submit form
    cy.get('button[type="submit"]').click();

    // Wait for API call
    cy.wait('@submitForm');

    // Check success message
    cy.get('div').should('contain', 'Thank you for your interest!');
  });

  it('validates form fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check validation errors
    cy.get('div').should('contain', 'Name is required');
    cy.get('div').should('contain', 'Email is required');
  });

  it('handles network errors gracefully', () => {
    // Intercept API call with error
    cy.intercept('POST', '**/interest_submissions', {
      statusCode: 500,
      body: { error: 'Internal server error' },
    }).as('submitFormError');

    // Fill and submit form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();

    // Wait for error
    cy.wait('@submitFormError');

    // Check error message
    cy.get('div').should('contain', 'Something went wrong');
  });

  it('is responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('h1').should('be.visible');
    cy.get('form').should('be.visible');
  });

  it('handles checkbox interactions', () => {
    cy.get('input[name="subscribe_newsletter"]').check();
    cy.get('input[name="subscribe_updates"]').check();
    cy.get('input[name="subscribe_releases"]').check();

    cy.get('input[name="subscribe_newsletter"]').should('be.checked');
    cy.get('input[name="subscribe_updates"]').should('be.checked');
    cy.get('input[name="subscribe_releases"]').should('be.checked');
  });

  it('validates email format', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();

    cy.get('div').should('contain', 'Please enter a valid email address');
  });

  it('shows loading state during submission', () => {
    // Intercept API call with delay
    cy.intercept('POST', '**/interest_submissions', (req) => {
      req.reply({
        delay: 1000,
        statusCode: 200,
        body: { id: '1' },
      });
    }).as('submitFormDelay');

    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.get('button').should('contain', 'Joining...');
    cy.get('button[type="submit"]').should('be.disabled');
  });
}); 
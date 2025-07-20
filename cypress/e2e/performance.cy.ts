describe('Performance', () => {
  it('loads within performance budget', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.spy(win.console, 'log').as('consoleLog');
      },
    });

    // Check page load time
    cy.window().then((win) => {
      const navigation = win.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      
      expect(loadTime).to.be.lessThan(3000); // 3 seconds
    });
  });

  it('has good Core Web Vitals', () => {
    cy.visit('/');

    // Check LCP (Largest Contentful Paint)
    cy.window().then((win) => {
      new win.PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        expect(lastEntry.startTime).to.be.lessThan(2500); // 2.5 seconds
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  });

  it('loads images efficiently', () => {
    cy.visit('/');

    // Check if images are optimized
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible');
      cy.wrap($img).should('have.attr', 'loading', 'lazy');
    });
  });

  it('has minimal bundle size', () => {
    cy.visit('/');

    // Check resource sizes
    cy.window().then((win) => {
      const resources = win.performance.getEntriesByType('resource');
      const totalSize = resources.reduce((sum, resource) => {
        return sum + (resource.transferSize || 0);
      }, 0);

      // Total transfer size should be less than 500KB
      expect(totalSize).to.be.lessThan(500 * 1024);
    });
  });

  it('loads critical CSS inline', () => {
    cy.visit('/');

    // Check if critical CSS is inlined
    cy.get('head style').should('exist');
  });

  it('has fast form interactions', () => {
    cy.visit('/');

    // Measure form interaction performance
    const startTime = performance.now();
    
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    
    const endTime = performance.now();
    const interactionTime = endTime - startTime;
    
    expect(interactionTime).to.be.lessThan(100); // 100ms
  });
}); 
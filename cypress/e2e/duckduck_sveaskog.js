describe('DuckDuckGo Search', () => {
    it('should search for sveaskog', () => {
      // 1. Visit DuckDuckGo
      cy.visit('https://duckduckgo.com/');
  
      // 2. Find the search input element
      cy.get('input[name="q"]').as('searchBox'); // Alias the search box for re-use
  
      // 3. Type "sveaskog" into the search box
      cy.get('@searchBox').type('sveaskog');
  
      // 4. Submit the form (hit Enter)
      cy.get('@searchBox').type('{enter}');
  
      // 5.  (Optional) Add an assertion to verify that search results are displayed.  A simple check is to see if *any* results are present.  A more specific check would look for a specific result.  I'll show both.
  
      // 5a. Assert that *some* results are displayed (at least one link)
      cy.get('a').should('be.visible'); // Checks that at least one link is visible in the results
  
      // 5b.  (More specific assertion -  uncomment to use) Assert that a specific result is present (replace with a known expected result if you have one)
      // cy.contains('a', 'Sveaskog').should('be.visible'); //Checks for a link containing the text "Sveaskog"
    });
  });
  
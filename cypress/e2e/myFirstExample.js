context('My First Example', () => {
    beforeEach(() => {
      cy.visit('https://example.cypress.io/commands/actions')
    })

    it('has an h1 on the page', () => {
        cy.get('h1').should('exist');
    })
})
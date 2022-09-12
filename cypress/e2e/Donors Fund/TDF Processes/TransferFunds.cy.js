context('Make a transfer', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })

    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })

    it('Transfers Funds to another Donor', () => {

        cy.visitDashboard() 
        cy.findByText('Transfer funds').click()
        
 
        
    }) 
})
context('Make a transfer', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })

    before(() => {
        cy.liveUserLogin2().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })

    it('Transfers Funds to another Donor', () => {
        const num =`${Math.floor(Math.random())}`
        cy.visitDashboard()   
        cy.findByText('Profile Settings').click() 
        cy.findByText('Account Information').should('have.class', 'active')
        cy.findByText('Profile Information').parent('span')
        .within(() => {
            cy.get('input').check()
        })  
        

    }) 
})
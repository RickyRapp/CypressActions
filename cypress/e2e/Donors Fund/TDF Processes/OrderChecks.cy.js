context('Order Checks', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })

    before(() => {
        cy.liveUserLogin2().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })

    it('Orders checks', () => { 
        cy.visitDashboard()   
        cy.findByText('Order Checks').first().click()
        cy.get('.row u-display--flex--align--center u-mar--bottom--sml').eq(3).find('.counter__btn--plus').click()
        cy.findByText('Pick Up').parent('span')
        .within(() => {
            cy.get('input').check()
        }) 
        cy.findByPlaceholderText('Place Order').click()
        cy.get('th').last().then((totalTh) => {
            const totalAmount = parseFloat(totalTh.text().replace('$','').replace(/,/g,''))  
            cy.findByPlaceholderText('Confirm').click() 
        }) 
    }) 
})
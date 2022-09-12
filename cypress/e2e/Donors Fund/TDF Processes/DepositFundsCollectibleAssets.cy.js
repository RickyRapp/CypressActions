context('Collectible Assets deposit', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })
 
    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })
 
    it('makes a Collectible Assets deposit', () => { 
        cy.visitDashboard()
         cy.get('.dashboard-card__body--amount').then((theElement) => { 
             
             const currentBalance = parseFloat(theElement.text().replace('$','').replace(/,/g,''))    
 
           //  const num =`${Math.floor(Math.random() * (1500 - 1000) + 1000)}`
             const num =`${Math.floor(Math.random() * (60000 - 50000) + 50000)}`
             cy.log(num)
             cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                 cy.get('.u-icon--collectible-assets').should('exist')
             })
             cy.get('.u-icon--collectible-assets').click()
             cy.get('.u-icon--collectible-assets').should('have.class', 'active') 
             cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter} {esc}') 
             cy.findByPlaceholderText('Enter Amount').type(num).wait(500)
             cy.addAndCheckDeposit(num, currentBalance)
              
         })  
         
     })   
})
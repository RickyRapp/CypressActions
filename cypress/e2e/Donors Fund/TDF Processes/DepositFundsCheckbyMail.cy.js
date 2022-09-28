context('Check by mail deposit', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    }) 

    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })
  
    it('makes a Check by mail deposit', () => {

        cy.visitDashboard()
        cy.get('.dashboard-card__body--amount').then((theElement) => { 
            
            const currentBalance = parseFloat(theElement.text().replace('$','').replace(/,/g,''))     
            cy.log(`currentBalance ${currentBalance}`)      
            console.log(`currentBalance ${currentBalance}`) 

          //  const num =`${Math.floor(Math.random() * (1500 - 1000) + 1000)}`
            const num =`${Math.floor(Math.random()*111)}`
            cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                cy.get('.u-icon--check').should('exist')
            })
            cy.get('.u-icon--check').click()
            cy.get('.u-icon--check').should('have.class', 'active') 
            cy.findByPlaceholderText('Enter check number').type('123456789', {force:true}).wait(500)
            cy.findByPlaceholderText('Enter Amount').type(num).wait(500)
            cy.addAndCheckDeposit(num, currentBalance) 

        }) 
        
    })  
})
context('Paycheck Direct deposit', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })

    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })
 
    it('makes a Paycheck Direct deposit', () => {

        //get the starting balance
        cy.visitDashboard()
        cy.get('.dashboard-card__body--amount').then((theElement) => { 
            
            const currentBalance = parseFloat(theElement.text().slice(1).replace(',',''))   
          //  const num =`${Math.floor(Math.random() * (1500 - 1000) + 1000)}`
            const num =`${Math.floor(Math.random() * (60000 - 50000) + 50000)}`
            cy.log(num)
           // cy.findByText('Activity').click().wait(500)
             cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                cy.get('.u-icon--paycheck-direct').should('exist')
            })
            cy.get('.u-icon--paycheck-direct').click()
            cy.get('.u-icon--paycheck-direct').should('have.class', 'active') 
            cy.findByPlaceholderText('Name Of Employment').type('Ricky Test Employment').wait(700)
            cy.findByPlaceholderText('Enter Amount').type(num).wait(500)
            cy.addAndCheckDeposit(num, currentBalance)

        })  
        
    })  
})
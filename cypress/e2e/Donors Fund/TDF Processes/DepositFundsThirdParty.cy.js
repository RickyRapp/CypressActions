context('makes a Third Party Donor-Advised Funds deposit', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })
  
    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })


    it('makes a Third Party Donor-Advised Funds deposit', () => {
        // console.log(theElement.text())
 
        cy.visitDashboard()
        cy.get('.dashboard-card__body--amount').then((theElement) => { 
 
            const currentBalance = parseFloat(theElement.text().replace('$','').replace(/,/g,''))       
             cy.log(`currentBalance ${currentBalance}`)  

             //make the deposit 
             const num =`${Math.floor(Math.random() * (1500 - 1000) + 1000)}`
             cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                cy.get('.u-icon--third-party-donor-advised-funds').should('exist')
            })
            cy.get('.u-icon--third-party-donor-advised-funds').click()
            cy.get('.u-icon--third-party-donor-advised-funds').should('have.class', 'active') 
             cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter}').wait(1000)
             cy.findByText('Fund holder name').type('john doe')  
             cy.findByPlaceholderText('Enter Amount').type(num)  
             cy.addAndCheckDeposit(num, currentBalance)
 
         }) 
         
     })
})
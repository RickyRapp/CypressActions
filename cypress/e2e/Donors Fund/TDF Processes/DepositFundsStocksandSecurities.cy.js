context('Deposits Stock and securities ', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    })

    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    })
  
 
    it('Deposits Stock and securities ', () => {
       // console.log(theElement.text())  
       cy.visitDashboard()
       cy.get('.dashboard-card__body--amount').then((theElement) => { 
   
            cy.log(`currentBalance ${theElement.text()}`)      
            const currentBalance = parseFloat(theElement.text().replace('$','').replace(/,/g,''))     
            cy.log(`currentBalance ${currentBalance}`)  

            //make the deposit 
            const num =`${Math.floor(Math.random() * (1500 - 1000) + 1000)}`
            cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                cy.get('.u-icon--stock-and-securities').should('exist')
            })
            cy.get('.u-icon--stock-and-securities').click()
            cy.get('.u-icon--stock-and-securities').should('have.class', 'active')   
            cy.contains('.form__group__label','Brokerage Institution').parent('div').within(()=> {
            cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter}').wait(1000)
            }) 
            cy.contains('.form__group__label','Security type').parent('div').within(()=> {
            cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter}').wait(1000)
            })   
            cy.findByPlaceholderText('Security symbol').type('123456')
            cy.findByText('Number of shares').parent('div').within(()=> {
            cy.get('input').type('5')
            }) 
            cy.findByPlaceholderText('Enter Amount').type(num)  
            cy.addAndCheckDeposit(num, currentBalance)

        }) 
        
    })
})
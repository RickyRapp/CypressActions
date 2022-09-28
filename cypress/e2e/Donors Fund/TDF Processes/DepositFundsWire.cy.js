context('Makes Wire transfer Deposit', () => {  

    before(() => { 
        //cy.liveUserLogin().wait(700)
    }) 
 
    beforeEach(() => {
        cy.liveUserLogin().wait(7000)
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900) 
    }) 


    it('Makes Wire transfer Deposit', () => {
       // console.log(theElement.text())  
       cy.visitDashboard()
       cy.get('.dashboard-card__body--amount').then((theElement) => { 

            cy.log(`before currentBalance ${theElement.text()}`) 
            const currentBalance = parseFloat(theElement.text().replace('$','').replace(/,/g,''))     
            cy.log(`after currentBalance ${currentBalance}`) 
   
            //make the deposit 
            const num =`${Math.floor(Math.random() * (350 - 250) + 250)}`
            console.log(`num ${num}`)
            cy.findByText('Deposit funds').click().wait(2500).then(() => { 
                cy.get('.u-icon--wire-transfer').should('exist')
            })
            cy.get('.u-icon--wire-transfer').click()
            cy.get('.u-icon--wire-transfer').should('have.class', 'active')  
            cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter}').wait(1000)
            //cy.get('.k-dropdown-wrap').should('not.have.value','')
            cy.findByPlaceholderText('Enter Amount').type(num, {force:true})
            cy.get('.k-dropdown-wrap').click().type('{downArrow} {enter}').wait(1000)
            cy.addAndCheckDeposit(num, currentBalance) 

        }) 
        
    })
})
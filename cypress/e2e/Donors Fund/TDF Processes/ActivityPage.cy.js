context('Checks activity page', () => {   

    before(() => {  
        cy.liveUserLogin()
        cy.on('uncaught:exception', () => false);
        cy.viewport(1440, 900)  
    })

    it('checks activity page', () => { 
        cy.findByText('Activity').click().wait(500)
        var i=0;
        var lastBalance = 0;
        var currentBalance = 0;
        var shouldBalance = 0;
        var credit = 0;
        cy.get('.k-master-row').should('exist');
        cy.get('.k-master-row').each((thisRow) => {
  

            i++; 
            //capture the last balance
          //  lastBalance = currentBalance;
            //cy.log(`old shouldBalance: ${shouldBalance}`)
            //capture current balance 
            //currentBalance = parseFloat(thisRow.find('td').last().text().replace(/\,/,'').replace('$',''))
            currentBalance = parseFloat(thisRow.find('td').last().text().replace('$','').replace(/,/g,''))
            //cy.log(`currentBalance: ${currentBalance}`) 

             
            //make sure it matches what it should 

            if (i!=1) {
              //  currentBalance.should('eq',shouldBalance)
                expect(currentBalance.toFixed(2)).to.eq(shouldBalance.toFixed(2)) 
            }
            //capture the credit  
            
            //credit = parseFloat(thisRow.find('td').prev().last().text().replace(/\,/,'').replace('$',''))
            credit = (thisRow.find('td').prev().last().text().replace('$','').replace(/,/g,''))
           // cy.log(`credit: ${credit}`) 
            shouldBalance = (parseFloat(currentBalance) - parseFloat(credit))   
           // cy.log(shouldBalance)
        })  
    })

})
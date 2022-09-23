// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands'
//require('cypress-downloadfile/lib/downloadFileCommand')
//require('cy-verify-downloads').addCustomCommand();

//these commands act as functions to automate the login process - may need to remove cy.visit
Cypress.Commands.add("localAdminLogin", () => {
    cy.viewport(1440, 900)  
    cy.visit('http://localhost:3000/app/login') 
    cy.on('uncaught:exception', () => false);
    cy.findByPlaceholderText('Enter Email').clear() 
    cy.findByPlaceholderText('Enter Email').type('ricky.test.admin')
    cy.findByPlaceholderText('Enter password').clear() 
    cy.findByPlaceholderText('Enter password').type('Ricky.123{enter}') 
})

Cypress.Commands.add("localUserLogin", () => {
    cy.viewport(1440, 900)  
    cy.visit('http://localhost:3000/app/login') 
    cy.on('uncaught:exception', () => false);
    cy.findByPlaceholderText('Enter Email').clear() 
    cy.findByPlaceholderText('Enter Email').type('rebecca@thedonorsfund.org')
    cy.findByPlaceholderText('Enter password').clear() 
    cy.findByPlaceholderText('Enter password').type('Ricky.123{enter}') 
}) 

Cypress.Commands.add("liveAdminLogin", () => {
    cy.viewport(1440, 900)  
    cy.visit('https://tdfcharitable.org/app/login') 
    cy.on('uncaught:exception', () => false);
    cy.findByPlaceholderText('Enter Email').clear() 
    cy.findByPlaceholderText('Enter Email').type('Test.Admin')
    cy.findByPlaceholderText('Enter password').clear() 
    cy.findByPlaceholderText('Enter password').type('Test.123{enter}') 
    cy.wait(2500)
})

Cypress.Commands.add("liveUserLogin", () => {
    cy.viewport(1440, 900)  
    cy.visit('https://tdfcharitable.org/app/login') 
    //cy.on('uncaught:exception', () => false);
    cy.findByPlaceholderText('Enter Email').clear() 
    cy.findByPlaceholderText('Enter Email').type('Test.User@thedonorsfund.org')
    cy.findByPlaceholderText('Enter password').clear() 
    cy.findByPlaceholderText('Enter password').type('Test.123{enter}') 
    cy.wait(2500)
})

Cypress.Commands.add("visitDashboard", () => {
       //get the starting balance
     //  cy.contains('button', 'Sign In').should('not.exist');
       cy.findByText('Dashboard').should('exist') 
       cy.findByText('Dashboard').click() 
       cy.contains('span','Logout').should('be.visible') 
       cy.wait(7000)
      // cy.get('.dashboard-card__body--amount').scrollIntoView()
      // cy.get('.dashboard-card__body--amount').should('be.visible') 
})

Cypress.Commands.add("addAndCheckDeposit", (num, currentBalance) => {
    cy.findByText('I agree to Policies and Guidelines').parent('div')
    .within(() => {
        cy.get('input').check({force:true}).wait(2500)
    }) 
    cy.contains('button', 'Continue').click({force:true})
    cy.contains('button', 'Proceed To Next Step').click().wait(2500)
    
        //check that the deposited funds are pending 
    cy.findByText('All Deposits').click()
    cy.findByText('Advanced Search').click()
    cy.findByPlaceholderText('Amount e.g. $100 or $100-$500').type(num)
    cy.get('.btn--primary').eq(1).click({force: true}).wait(1000) 
    cy.get('body').should('contain', 'Pending')  
    cy.get('td').eq(1).then((theElement) => { 

        const confirmationNum = theElement.text()  

        //logout and log back in as admin to approve    
        cy.findByText('Logout').click() 
        cy.liveAdminLogin().wait(700)

        cy.findByText('Deposit').click()
        cy.findByText('Advanced Search').click()
        cy.get('#confirmationNumber').type(confirmationNum) 
        cy.get('.btn--primary').eq(1).click({force: true}).wait(1000)
       // cy.intercept({
        //    method: "GET",
         //   url: "https://api.tdfcharitable.org/thedonorsfund/contribution/current-contribution-ach-batch-number?increment=false",
         // }).as("dataGetFirst"); 
       // cy.wait("@dataGetFirst");
     //   cy.wait('https://api.tdfcharitable.org/thedonorsfund/contribution/current-contribution-ach-batch-number?increment=false')
        cy.get('.u-icon--approve').click()
        cy.findByText('YES').click().wait(500)
        cy.get('body').should('contain', 'In Process')
        cy.get('.u-icon--approve').click().wait(500)
        cy.findByText('YES').click()


        //logout and back in as a user to make sure the current avaialable amount is correct
        cy.findByText('Logout').click() 
        cy.liveUserLogin().wait(700)

        //check that the deposited funds are available 
        cy.findByText('Dashboard').click()
        //cy.log(`currentBalance ${currentBalance}`)  
        //cy.log(`num ${num}`)  
        const newBalance = parseFloat(currentBalance) + parseFloat(num)
  
        cy.log(`newBalance ${newBalance}`)  
        cy.get('.dashboard-card__body--amount').then((shouldBalance) => { 
            //cy.log(`with math.trunc, and slice and replace comma ${Math.trunc(shouldBalance.text().slice(1).replace(',',''))}`)
            //cy.log(`with math.trunc, and double replace ${Math.trunc(shouldBalance.text().replace('$','').replace(/\,/,''))}`)
            //cy.log(` no math.trunc ${parseFloat(shouldBalance.text().replace('$','').replace(/,/g,''))}`)
            expect(newBalance).to.equal(parseFloat(shouldBalance.text().replace('$','').replace(/,/g,''))) 
        }) 

        //logout and log back in as admin to reject    
        cy.findByText('Logout').click() 
        cy.liveAdminLogin().wait(700)

        cy.findByText('Deposit').click()
        cy.findByText('Advanced Search').click()
        cy.get('#confirmationNumber').type(confirmationNum) 
        cy.get('.btn--primary').eq(1).click({force: true}).wait(1000)
        cy.get('.u-icon--approve').click()
        cy.findByText('YES').click().wait(500)
        cy.get('body').should('contain', 'Declined') 

        //logout and back in as a user to make sure the current avaialable amount is correct
        cy.findByText('Logout').click() 
        cy.liveUserLogin().wait(700)

        //check that the deposited funds are available 
        cy.findByText('Dashboard').click()
        //cy.log(`currentBalance ${currentBalance}`)  
        //cy.log(`num ${num}`)  
        const newBalance2 = parseFloat(newBalance) - parseFloat(num)
  
        cy.log(`newBalance ${newBalance2}`)  
        cy.get('.dashboard-card__body--amount').then((shouldBalance2) => { 
            //cy.log(`with math.trunc, and slice and replace comma ${Math.trunc(shouldBalance.text().slice(1).replace(',',''))}`)
            //cy.log(`with math.trunc, and double replace ${Math.trunc(shouldBalance.text().replace('$','').replace(/\,/,''))}`)
            //cy.log(` no math.trunc ${parseFloat(shouldBalance.text().replace('$','').replace(/,/g,''))}`)
            expect(newBalance2).to.equal(parseFloat(shouldBalance2.text().replace('$','').replace(/,/g,''))) 
        }) 

    })
    cy.findByText('Logout').click() 
})
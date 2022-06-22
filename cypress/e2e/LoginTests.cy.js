context('Login Screen ', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('checks that page redirects to proper page when logging in as user', () => { 
    cy.get('#uname').type('user')
    cy.get('#pass').type('pass1{enter}')
    cy.url().should('eq','http://localhost:3000/user')  
  })

  it('checks that page redirects to proper page when logging in as admin', () => { 
    cy.get('#uname').type('admin')
    cy.get('#pass').type('pass2{enter}')
    cy.url().should('eq','http://localhost:3000/admin')  
  })

  it('checks that all inputs are required', () => {  
    cy.get('input').invoke('attr', 'required') 
  }) 

  it('checks that a title exists on the page', () => {  
    cy.get('.title').should('exist') 
  }) 

  it('checks that all inputs have a shadow', () => {  
    cy.get('#uname').invoke('css', 'shadow') 
  })  

  it('checks that all inputs are required', () => {  
    cy.get('#uname').type('invalid{enter}') 
  }) 

  it ('should contain a label and an input ', () => {
    cy.get('.input-container input').should('exist')
    cy.get('.input-container label').should('exist')
  })

  it('gets user info ', ()=>{
    cy.fixture('loginUsers').then(function(data) { 
        //cy.get('#uname').type("invalid") 
        //cy.get(".error")
      cy.log(data)
      cy.log(data.map((datas)=>{datas.username}))
    })
  })



})
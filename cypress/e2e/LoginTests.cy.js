context('Login Screen ', () => {

  beforeEach(() => {
    cy.visit('/')
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
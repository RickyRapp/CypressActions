context('Login Screen ', () => {

  beforeEach(() => {
    cy.visit('https://all-restaurants.herokuapp.com/')
  })

  //it('gets user info ', ()=>{
   // cy.fixture('loginUsers').then(function(data) {  
    //  cy.log(data)
     // cy.get('#uname').type('invalid username')
      //cy.log(data.map((datas)=>{datas.username==='user'}))
   // })
  //s}) 
  
  it('checks for bolded home tab and unbolded user and admin tabs', () => { 
      cy.findAllByText('Home').should('have.css', 'font-weight', '700')     
      cy.findAllByText('User').should('have.css', 'font-weight', '400')
      cy.findAllByText('Admin').should('have.css', 'font-weight', '400') 
  })

  it('checks for green submit button', () => { 
      cy.get('[type=submit]').should('have.css', 'background' ,'rgb(1, 210, 142) none repeat scroll 0% 0% / auto padding-box border-box')      
  })

  it('checks for error message if invalid username was entered', () => { 
    cy.get('#uname').type('invalid username')
    cy.get('#pass').type('pass1{enter}') 
    cy.get('.error').contains('invalid username')
  }) 

  it('checks for error message if invalid username was entered', () => { 
    cy.get('#uname').type('user')
    cy.get('#pass').type('pass2{enter}') 
    cy.get('.error').contains('invalid password')
  }) 

  it('checks for error message if invalid username was entered', () => { 
    cy.get('#uname').type('admin')
    cy.get('#pass').type('pass1{enter}') 
    cy.get('.error').contains('invalid password')
  }) 

  it('checks that page redirects to proper page when logging in as user', () => { 
    cy.get('#uname').type('user')
    cy.get('#pass').type('pass1{enter}')
    cy.url().should('eq','https://all-restaurants.herokuapp.com/user')  
  })

  it('checks that page redirects to proper page when logging in as admin', () => { 
    cy.get('#uname').type('admin')
    cy.get('#pass').type('pass2{enter}')
    cy.url().should('eq','https://all-restaurants.herokuapp.com/admin')  
  })

  it('checks that all inputs are required', () => {  
    cy.get('input').invoke('attr', 'required') 
  }) 

  it('checks that a title exists on the page', () => {  
    cy.get('.title').should('contain','Sign In') 
  }) 

  it('checks that all inputs have a shadow', () => {  
    cy.get('input').invoke('css', 'shadow') 
  }) 

  it ('should contain a label and an input ', () => {
    cy.get('.input-container input').should('exist')
    cy.get('.input-container label').should('exist')
  }) 

})
import axios from'axios';
const navBarText = Cypress.env('navBarText')

context('My First Example', () => {

  beforeEach(() => {
    cy.visit('/admin')
  })

  //it('correctly renders cypress website link', () => {
  //  cy.visit('/admin')
  //  cy.findByText('Welcome!').should('exist')
 // })

  /*
  it('checks for valid category success message', () => {
    cy.visit('/admin')
    cy.get('#addCategory').click()
    cy.findByPlaceholderText('Name').type('Hi there!').invoke('val').should('not.be.empty')
    cy.findAllByText('Save').click() 
    cy.get('.success').should('have.attr', 'style', 'color: green;').should('contain.text','Successfully Saved!')
  
  })
*/

  it('checks for valid category input - added', () => { 
    cy.get('#addCategory').click()
    cy.findByPlaceholderText('Name').clear()
    cy.findAllByText('Save Category').click()  
    cy.get('.error')
  })

  it('prevents category accidental deletion ', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#deleteCategory').click()
    cy.on('window:confirm', () => false)
  })

  it('checks for valid category input -edited ', () => { 
    cy.get('#categorySelect option').should('have.length.gt', 0)
    cy.get('#categorySelect').select(1)   
 //   cy.get('#categorySelect option').last().then($lastOption => {
  //    cy.get('#categorySelect').select($lastOption.text())  
   // })
    cy.get('#editCategory').click()
    cy.findByPlaceholderText('Name').clear()
    cy.findAllByText('Save Category').click()
    cy.get('.error')
  })

  
  it('checks for valid restaurant title - added', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').clear()
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.error')
  })
 

  it('checks for restaurant address - added', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').clear() 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.error')
  })


  it('checks for VALID restaurant address - added', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').type("0") 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.error')
  })


 /*
  it('pulls data from a fixture', () => {
    cy.fixture('example').then((data)=>{
      cy.log(data)
    })
  })

  it('uses fixture data in a network reqeust', () => {

  })

  it('udpates fixture data inline ', ()=>{
    cy.fixture('example').then((data)=>{
      data.email="updatedemail@gmail.com"
      cy.log(data)
    })
  })

  it('udpates fixture data inline ', ()=>{
    cy.fixture('example').then(function(data) {
      this.data = data 
      cy.log(data)
    })
  })

     before(() => {
      cy.request('https://restaurant-selections.herokuapp.com/categories').its('body').should('have.length',5)
      //cy.visit('/')
    })

    it('visits the home page', () => {
      cy.visit('/')
    })

    it('has an h1 on the page', () => {
      cy.visit('/user')
      cy.get('div').should('exist');
    })
    


   
    it('has an h1 on the page', () => {
      cy.get('h1').should('exist');
    })

    it('contains the correct h1 text', () => {
      cy.get('h1').should('contain.text','Actions');
    })

    it('renders a paragraph under h1', () => {
      cy.get('.container').eq(1).find('p').should('exist')
    })

    it('renders a section with correct elements',() => {
      cy.get('.container').eq(2).within(()=>{
        cy.get('h4').should('exist');
        cy.get('p').should('exist');
      })
    })

    it('types into email field', () => {
      cy.visit('/admin')
      cy.findByPlaceholderText('Name').type('The Best Restaurant')
      cy.wait(2000).then(
        async() => { 
          fetch('https://restaurant-selections.herokuapp.com/categories') 
            .then((res) => res.json())
            .then((data) => console.log(data)) 
        }
      )
      cy.log('test finished')
      
    })

    it('shows an active class for the current page', () => {
      cy.visit('/')
      cy.get('.admin').should('have.class', 'item')
    })

    it('should not have active on inactive pages', () => {
      cy.visit('/')
      cy.get('.admin').should('not.have.selected').should('have attr' , 'href', '/admin')
    })

  it('links to the home page correctly', () => {
    cy.visit('/admin')
    cy.url().should('include', 'admin')
    cy.findByPlaceholderText('Name').type('this is a Test').should('have.value','this is a Test')
  })

  it('lets you clear an input field', () => {
    cy.visit('/admin')
    cy.findByLabelText('Enter Category Name').type('test description').should('have.value','test description')
    .clear().should('have.value','')
  })

  it('links to the home page correctly', () => {
    cy.visit('/admin')
    cy.url().should('include', 'admin')
    cy.findAllByText('Cancel').click()
  })
*/ 



})
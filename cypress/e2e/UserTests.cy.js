context('Testing the user section ', () => {

  beforeEach(() => {
    cy.visit('https://all-restaurants.herokuapp.com/user')
  }) 
 
  it('checks for bolded home tab and unbolded user and admin tabs', () => { 
    cy.findAllByText('Home').should('have.css', 'font-weight', '400')     
    cy.findAllByText('User').should('have.css', 'font-weight', '700')
    cy.findAllByText('Admin').should('have.css', 'font-weight', '400') 
})

  it('displays "choose a category" message', () => {
    cy.get('.header').contains('Welcome! Please choose a category to view the list of restaurants!') 
  })

  it('checks that all dropdowns are rendering properly  ', () => {  
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').should('be.visible')
    cy.get('#restaurantSelect').select(1)   
    cy.findAllByText('Add a Booking!').click();
    cy.findAllByPlaceholderText('Name').should('be.visible')
  })
 
  it('checks that map and restaurant details are displaying when a restaurant is selected ', () => {  
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').should('be.visible')
    cy.get('#restaurantSelect').select(1)     
    cy.get('.c-map').should('be.visible')
    cy.findAllByText('Restaurant Details').should('be.visible')
  })

  it('checks that map and restaurant details are displaying when a restaurant is selected ', () => { 
    cy.findAllByText('Logout').click()
    cy.url().should('eq','https://all-restaurants.herokuapp.com/') 
  })

  //it('displays a list of all the categories', () => { 
    //cy.get('#categorySelect').select(2)    
  //  cy.intercept('https://restaurant-selections.herokuapp.com/categories', { fixture: 'categories.json' })
  //})

 // it('mocks a create booking', () => {
  //  cy.visit('/user')
   // cy.intercept('POST', 'https://restaurant-selections.herokuapp.com/bookings').as('createBooking')
   // cy.get('#categorySelect').select(1)   
   // cy.get('#restaurantSelect').select(1)   
   // cy.findAllByText('Add a Booking!').click();
   // cy.findAllByPlaceholderText('Name').type("Ricky Rappaport{enter}")
   // cy.wait('@createBooking').then(({response}) => {
   //   expect(response.statusCode).to.eq(201) 
   // })
 // })
 



})
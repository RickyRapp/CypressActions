context('All inputs in the admin section ', () => {

  beforeEach(() => {
    cy.visit('/user')
  }) 

  it('checks for VALID restaurant address - edited', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').select(1)   
    cy.get('#editRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').type("0") 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.error')
  })

})
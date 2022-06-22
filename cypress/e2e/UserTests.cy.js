context('checks the user section ', () => {

  beforeEach(() => {
    cy.visit('http:localhost:3000/user')
  }) 
 
  it('displays a list of all the categories', () => { 
    cy.intercept('GET', 'https://restaurant-selections.herokuapp.com/categories', { fixture: 'categories.json' })
  })

  it('mocks post request', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').select(1)   
    cy.findAllByText('Add a Booking!').click();
    cy.intercept('POST', 'https://restaurant-selections.herokuapp.com/bookings', (req) => {
      req.reply((res) => {
        res.send({
          msg:"hi"
        })
      })
    })
  })



})
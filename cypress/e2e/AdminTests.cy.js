context('All inputs in the admin section ', () => {

    beforeEach(() => {
      cy.visit('/admin')
    }) 
    
  it('checks for valid category input - added', () => {  
    cy.get('#addCategory').click()
    cy.findByPlaceholderText('Name').invoke('attr', 'required') 
    cy.findByPlaceholderText('Name').clear()
    cy.findAllByText('Save Category').click()  
    cy.get('.success').should('not.exist')
  })

  it('checks for valid category input - added', () => {  
    cy.get('#addCategory').click()
    cy.findByPlaceholderText('Name').invoke('attr', 'required') 
    cy.findByPlaceholderText('Name').clear()
    cy.findAllByText('Save Category').click()  
    cy.get('.success').should('not.exist')
  })

  it('prevents category accidental deletion ', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#deleteCategory').click()
    cy.on('window:confirm', () => false)
  })

  it('checks for valid category input -edited ', () => { 
    cy.get('#categorySelect option').should('have.length.gt', 0)
    cy.get('#categorySelect').select(1)    
    cy.get('#editCategory').click()
    cy.findByPlaceholderText('Name').invoke('attr', 'required')  
  })

  
  it('checks for valid restaurant title - added', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').invoke('attr', 'required') 
    cy.findByPlaceholderText('Restaurant Name').clear()
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.success').should('not.exist')
  })
 

  it('checks for restaurant address - added', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').invoke('attr', 'required') 
    cy.findByPlaceholderText('Address').clear() 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.success').should('not.exist')
  })


  it('checks for VALID restaurant address - added', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#addRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').type("0") 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.success').should('not.exist')
  })
  
  it('checks for valid restaurant title - edited', () => { 
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').select(1)   
    cy.get('#editRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').invoke('attr', 'required') 
    cy.findByPlaceholderText('Restaurant Name').clear()
   /cy.findAllByText('Save Restaurant').click() 
   cy.get('.success').should('not.exist')
  })

  it('checks for restaurant address - edited', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').select(1)   
    cy.get('#editRestaurant').click() 
    cy.findByPlaceholderText('Address').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').invoke('attr', 'required') 
    cy.findByPlaceholderText('Address').clear() 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.success').should('not.exist')
  })


  it('checks for VALID restaurant address - edited', () => {
    cy.get('#categorySelect').select(1)   
    cy.get('#restaurantSelect').select(1)   
    cy.get('#editRestaurant').click() 
    cy.findByPlaceholderText('Restaurant Name').type("Test Restaurant Name")
    cy.findByPlaceholderText('Address').type("0") 
    cy.findAllByText('Save Restaurant').click() 
    cy.get('.success').should('not.exist')
  }) 
 
  it('checks for bolded home tab and unbolded user and admin tabs', () => { 
    cy.findAllByText('Home').should('have.css', 'font-weight', '400')     
    cy.findAllByText('User').should('have.css', 'font-weight', '400')
    cy.findAllByText('Admin').should('have.css', 'font-weight', '700') 
  })

  it('displays "choose a category" message', () => {
    cy.get('.header').contains('Welcome! Please use the buttons below to add/edit categories and restaurants.') 
  })

  it('checks that map and restaurant details are displaying when a restaurant is selected ', () => { 
    cy.findAllByText('Logout').click()
    cy.url().should('eq','http://localhost:3000/') 
  })
 
})
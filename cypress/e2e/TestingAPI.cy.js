context('My First Example', () => { 

    it('Gets all restaurants', () => {
        cy.request('https://restaurant-selections.herokuapp.com/restaurants')
    })

    it('mocking post request', () => {
        //cy.intercept({
         //   method: 'POST',
          //  url: 'https://restaurant-selections.herokuapp.com/restaurants',                
           // body: {
            //    categoryNum: 3,
             //   name: 'The Newest Restaurant, ok?'
            //}, 
        //}).as('apiCheck')

        cy.intercept('POST', 'https://restaurant-selections.herokuapp.com/restaurants', 
        {
            statusCode: 400,
            body: {
                categoryNum: 3,
                name: 'The Newest Restaurant!!!'
            }, 
        })
        
        
        //, (req) => {
         //   expect(req.body).to.include('Acme Company')
        //})

       // cy.intercept('POST', 'https://restaurant-selections.herokuapp.com/restaurants').as('new-user') 
      //  cy.wait('@apiCheck').should('have.property', 'response.statusCode', 201) 
    })

    it('mocks post request', () => {  
        cy.intercept('POST', 'https://restaurant-selections.herokuapp.com/restaurants', 
            {
               // statusCode: 201,
                body: {
                    categoryNum: 3,
                    name: 'The Newest Restaurant!!!'
                }, 
            }
        
        )
    }) 

    it('udpates a restaurant ', () => { 
        let id
        cy
            .request('https://restaurant-selections.herokuapp.com/restaurants')
            .then( (res) => {
                id = res.body[0]._id 
                console.log(id)
            }) 
                .then( () => {  
                    console.log(id)
                    cy
                        .request({
                            method:'PATCH',
                            url: `https://restaurant-selections.herokuapp.com/restaurants/${id}`,
                            body:
                            {
                                categoryNum: 3,
                                name: 'Updated Restaurant'
                            },
                            qs: 
                            {
                                categoryNum: 3
                            },
                            headers: {
                            accept: 'application/json'
                            }
                        })
                })  
                    .then( categories => { 
                        cy.log(categories.status)
                        expect(categories.status).to.eq(200)
                        //cy.get(categories.status).should('be.gte', '200')
                        //expect(body).to.have.length(2)
                        //expect(body[0].name).to.eq('space travel plan')
                    })
    })

    it('Posts a new restaurant', () => {
        cy.request({
            method:'GET',
            url: 'https://restaurant-selections.herokuapp.com/restaurants',
            body:
            {
                categoryNum: 3,
                name: 'The Newest Restaurant!!!'
            },
            qs: 
            {
                categoryNum: 3
            },
            headers: {
            accept: 'application/json'
            }
        })
        .then( categories => { 
            cy.log(categories.status)
            expect(categories.status).to.eq(200) 
            cy.log(categories)
            //expect(body).to.have.length(2)
            //expect(body[0].name).to.eq('space travel plan')
        })
    })

    it('Gets a list of all restaurants', () => {
    cy.request({
        method:'GET',
        url: 'https://restaurant-selections.herokuapp.com/restaurants', 
        qs: 
        {
            categoryNum: 3
        },
        headers: {
        accept: 'application/json'
        }
        })
        .then( (body) => { 
            expect(body.status).to.eq(200) 
            //expect(body.status).to.have.length(2) 
    })  
    })

})
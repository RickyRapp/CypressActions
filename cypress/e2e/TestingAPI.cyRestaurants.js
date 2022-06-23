context('Testing API calls for Restaurants', () => { 

    it('Gets all restaurants', () => {
        cy.request('https://restaurant-selections.herokuapp.com/restaurants')
        .then( restaurants => {
            expect(restaurants.status).to.eq(200)
        })
    })

    it('Posts and deletes new restaurant', () => {
        let restaurantName='Restaurant should be deleted'
        let id
        cy.request({
            method:'POST',
            url: 'https://restaurant-selections.herokuapp.com/restaurants',
            body:
            { 
                name: restaurantName,
                address:'123 Test lane',
                categoryNum:3 
            }, 
            headers: {
                accept: 'application/json'
            }
        })
        .then( restaurants => {   
            expect(restaurants.status).to.eq(201)  
            expect(restaurants.body.name).to.contain(restaurantName)
            id = restaurants.body._id 
        })                
        .then( () => {   
            cy
                .request({
                    method:'DELETE',
                    url: `https://restaurant-selections.herokuapp.com/restaurants/${id}`, 
                    headers: {
                        accept: 'application/json'
                    }
                })
        })  
            .then( restaurants => { 
                cy.log(restaurants.status)
                expect(restaurants.status).to.eq(200) 
                expect(restaurants.body.message).to.eq("deleted successfully!") 
            })
    })

    it('Gets a list of all restaurants', () => {
        cy.request({
            method:'GET',
            url: 'https://restaurant-selections.herokuapp.com/restaurants',  
            headers: {
                accept: 'application/json'
            }
        })  
        .then( (res) => { 
            expect(res.status).to.eq(200)  
        })
    })

    it('udpates a restaurant ', () => { 
        let id
        cy
            .request('https://restaurant-selections.herokuapp.com/restaurants')
            .then( (res) => {
                id = res.body[4]._id  
            }) 
                .then( () => {   
                    cy
                        .request({
                            method:'PATCH',
                            url: `https://restaurant-selections.herokuapp.com/restaurants/${id}`,
                            body:
                            { 
                                name: 'Updated Restaurant'
                            }, 
                            headers: {
                            accept: 'application/json'
                            }
                        })
                })  
                    .then( restaurants => { 
                        cy.log(restaurants.status)
                        expect(restaurants.status).to.eq(200) 
                    })
    })
})
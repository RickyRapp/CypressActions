context('My First Example', () => { 

    it('Gets all categories', () => {
        cy.request('https://restaurant-selections.herokuapp.com/categories')
    })

    it('Posts and deletes new category', () => {
        let categoryName='Category should be deleted'
        let id
        cy.request({
            method:'POST',
            url: 'https://restaurant-selections.herokuapp.com/categories',
            body:
            { 
                category: categoryName
            }, 
            headers: {
                accept: 'application/json'
            }
        })
        .then( categories => { 
           // cy.log(categories.status)
            cy.log(categories.body)
            expect(categories.status).to.eq(201)  
            expect(categories.body.categoryName).to.contain(categoryName)
            id = categories.body._id 
        })                
        .then( () => {   
            cy
                .request({
                    method:'DELETE',
                    url: `https://restaurant-selections.herokuapp.com/categories/${id}`, 
                    headers: {
                        accept: 'application/json'
                    }
                })
        })  
            .then( categories => { 
                cy.log(categories.status)
                expect(categories.status).to.eq(200) 
                expect(categories.body.message).to.eq("deleted successfully!") 
            })
    })

    it('Gets a list of all categories', () => {
        cy.request({
            method:'GET',
            url: 'https://restaurant-selections.herokuapp.com/categories',  
            headers: {
                accept: 'application/json'
            }
        })  
        .then( (res) => { 
            expect(res.status).to.eq(200)  
        })
    })

    it('udpates a category ', () => { 
        let id
        cy
            .request('https://restaurant-selections.herokuapp.com/categories')
            .then( (res) => {
                id = res.body[4]._id  
            }) 
                .then( () => {   
                    cy
                        .request({
                            method:'PATCH',
                            url: `https://restaurant-selections.herokuapp.com/categories/${id}`,
                            body:
                            { 
                                name: 'Updated Category'
                            }, 
                            headers: {
                            accept: 'application/json'
                            }
                        })
                })  
                    .then( categories => { 
                        cy.log(categories.status)
                        expect(categories.status).to.eq(200) 
                    })
    })
})
context('My First Example', () => { 

    it('Gets all categories', () => {
        cy.request('https://restaurant-selections.herokuapp.com/categories')
    })

    it('Posts a new category', () => {
        cy.request({
            method:'POST',
            url: 'https://restaurant-selections.herokuapp.com/categories',
            body:
            { 
                name: 'The Newest Category'
            },
            //querystrings
          //  qs: 
           // {
            //    categoryNum: 3
            //},
            headers: {
                accept: 'application/json'
            }
        })
        .then( categories => { 
            cy.log(categories.status)
            expect(categories.status).to.eq(201) 
            //expect(body).to.have.length(2)
            //expect(body[0].name).to.eq('space travel plan')
        })
    })

    it('Gets a list of all restaurants', () => {
    cy.api({
        method:'GET',
        url: 'https://restaurant-selections.herokuapp.com/restaurants', 
        qs: 
        {
            categoryNum: 3
        },
        headers: {
        accept: 'application/json'
        }
        .then( ({status}) => { 
            expect(status).to.eq(201) 
            expect(body).to.have.length(2) 
        })
    })  
    })

})
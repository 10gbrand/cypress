describe("Test Services page on AGS", () => {
    it("Services page", () => {
        cy.fixture('karttjanster.services'.then((data) => {
          const  restServices=data 
        }))
        cy.request(
            {
                method: 'GET',
                url: `${Cypress.env('karttjanster')}/services?f=pjson`
            }
        )
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.currentVersion).to.eq(10.91)
        })
    })
})


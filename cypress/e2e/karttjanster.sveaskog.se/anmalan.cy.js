describe("Tjänster för Anmalan", () => {
    it("Services page", () => {
        cy.fixture('karttjansterAnmalan').then((restServices) => {
            cy.log('Fixture data:', JSON.stringify(restServices));

            cy.request({
                method: 'GET',
                url: `${Cypress.env('karttjanster')}/services?f=pjson`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
                .then((response) => {
                    const parsedBody = JSON.parse(response.body);
                    
                    // Log the entire response
                    //console.log('Full response:', response);
                    //cy.log('Full response:', JSON.stringify(response));

                    // Log specific parts
                    console.log('Response body:', parsedBody);
                    //console.log('Current Version:', parsedBody.currentVersion);
                    
                    // Assertions
                    expect(response.status).to.eq(200);
                    expect(parsedBody.currentVersion).to.eq(restServices.currentVersion);
                    expect(parsedBody.services).to.deep.equal(restServices.services);

                    // Additional checks
                    expect(parsedBody).to.have.property('services').that.is.an('array');
            });
        });
    });

    
});



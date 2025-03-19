const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Anmalan", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`Services page - ${KarttjansURL} - Run ${index + 1}`, () => {
                cy.fixture('karttjansterAnmalanAnmalan').then((restServices) => {
                    cy.log('Fixture data:', JSON.stringify(restServices));

                    cy.request({
                        method: 'GET',
                        url: `${KarttjansURL}/services/Anmalan?f=pjson`,
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
                            cy.log('Response body:', parsedBody);
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



            it(`Anmalan Mapservice - ${KarttjansURL} - Run ${index + 1}`, () => {
                cy.fixture('karttjansterAnmalanAnmalanMapservice').then((restServices) => {
                    cy.log('Fixture data:', JSON.stringify(restServices));

                    cy.request({
                        method: 'GET',
                        url: `${KarttjansURL}/services/Anmalan/Anmalan/MapServer?f=pjson`,
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
                            //console.log('Response body:', parsedBody);
                            //console.log('Current Version:', parsedBody.currentVersion);

                            // Assertions
                            expect(response.status).to.eq(200);
                            expect(parsedBody.currentVersion).to.eq(restServices.currentVersion);
                            expect(parsedBody.layers).to.deep.equal(restServices.layers);
                            expect(parsedBody.spatialReference).to.deep.equal(restServices.spatialReference);
                            expect(parsedBody.tables).to.deep.equal(restServices.tables);
                        });
                });
            });


            it(`Restriktioner FeatureServer - ${KarttjansURL} - Run ${index + 1}`, () => {
                cy.fixture('karttjansterAnmalanRestriktionerFeatureServer').then((restServices) => {
                    cy.log('Fixture data:', JSON.stringify(restServices));
                    cy.request({
                        method: 'GET',
                        url: `${KarttjansURL}/services/Anmalan/Restriktioner/FeatureServer?f=pjson`,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then((response) => {
                            const parsedBody = JSON.parse(response.body);

                            // Log specific parts
                            cy.log('Response body:', parsedBody);

                            // Assertions
                            expect(response.status).to.eq(200);
                            expect(parsedBody.currentVersion).to.eq(restServices.currentVersion);
                            expect(parsedBody.layers).to.deep.equal(restServices.layers);
                            expect(parsedBody.spatialReference).to.deep.equal(restServices.spatialReference);
                            expect(parsedBody.tables).to.deep.equal(restServices.tables);
                        });
                });
            });
        });




    });
});


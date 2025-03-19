const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Anmalan", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`Services page - ${KarttjansURL} - Run ${index + 1}`, () => {
                cy.fixture('karttjanster/anmalan/anmalan').then((restServices) => {
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
                            cy.log('Response body:', parsedBody);
                            
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
    });
});


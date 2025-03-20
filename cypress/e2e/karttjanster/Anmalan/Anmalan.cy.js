const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Anmalan", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`Services page - ${KarttjansURL}/services/Anmalan?f=pjson - Run ${index + 1}`, () => {
                cy.fixture('karttjanster/Anmalan/Anmalan').then((fixture) => {
                    cy.log('Fixture data:', JSON.stringify(fixture));
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
                            expect(parsedBody.currentVersion).to.eq(fixture.currentVersion);
                            expect(parsedBody.services).to.deep.equal(fixture.services);
                            
                            // Additional checks
                            expect(parsedBody).to.have.property('services').that.is.an('array');
                        });
                });
            });
        });
    });
});

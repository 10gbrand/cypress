const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Anmalan", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`Restriktioner FeatureServer - ${KarttjansURL} - Run ${index + 1}`, () => {
                cy.fixture('karttjanster/anmalan/restriktionerFeatureServer').then((restServices) => {
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


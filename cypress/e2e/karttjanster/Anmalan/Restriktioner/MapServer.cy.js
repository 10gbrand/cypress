const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Anmalan/Restriktioner", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`MapServer - ${KarttjansURL}/services/Anmalan/Restriktioner/MapServer?f=pjson - Run ${index + 1}`, () => {
                cy.fixture('karttjanster/Anmalan/Restriktioner/MapServer').then((fixture) => {
                    cy.log('Fixture data:', JSON.stringify(fixture));
                    cy.request({
                        method: 'GET',
                        url: `${KarttjansURL}/services/Anmalan/Restriktioner/MapServer?f=pjson`,
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
                            expect(parsedBody.currentVersion).to.eq(fixture.currentVersion);
                            expect(parsedBody.layers).to.deep.equal(fixture.layers);
                            expect(parsedBody.spatialReference).to.deep.equal(fixture.spatialReference);
                            expect(parsedBody.tables).to.deep.equal(fixture.tables);
                        });
                });
            });
        });
    });
});

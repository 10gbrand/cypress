const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("@Value(name)", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            it(`@Value(type) - ${KarttjansURL}/services/@Value(name)/@Value(type)?f=pjson - Run ${index + 1}`, () => {
                cy.fixture('karttjanster/@Value(name)/@Value(type)').then((fixture) => {
                    cy.log('Fixture data:', JSON.stringify(fixture));
                    cy.request({
                        method: 'GET',
                        url: `${KarttjansURL}/services/@Value(name)/@Value(type)?f=pjson`,
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
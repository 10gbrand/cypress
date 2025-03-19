const RERUNS = 3;
const URLSUFIX = Cypress.env('karttjansterSites');

describe("Test Services page on AGS", () => {
    URLSUFIX.forEach((urlsf) => {
        const KarttjansURL = `${Cypress.env('karttjansterBase')}${urlsf}.${Cypress.env('sveaDomain')}/${Cypress.env('karttjansterRest')}`;
        Cypress._.times(RERUNS, (index) => {
            describe(`Testing URL: ${KarttjansURL}`, () => {

                it(`Services page - Run ${index + 1}`, () => {
                    cy.fixture('karttjanster/services').then((restServices) => {
                        cy.log('Fixture data:', JSON.stringify(restServices));

                        cy.request({
                            method: 'GET',
                            url: `${KarttjansURL}/services?f=pjson`,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {
                            const parsedBody = JSON.parse(response.body);

                            // Assertions
                            expect(response.status).to.eq(200);
                            expect(parsedBody.currentVersion).to.eq(restServices.currentVersion);
                            expect(parsedBody.folders).to.deep.equal(restServices.folders);

                            // Additional checks
                            expect(parsedBody).to.have.property('folders').that.is.an('array');
                            expect(parsedBody).to.have.property('services').that.is.an('array');
                        });
                    });
                });
            });
        });
    });
});

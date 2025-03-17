describe('Geotjanster MO at coordinate', () => {
    it('verifies contains endpoint response', () => {
      cy.request({
        method: 'GET',
        url: 'http://geotjanster/Relation/v5/RelationService.svc/rest/contains',
        timeout: 60000, // Wait up to 60 seconds (default: xxs)
        qs: {
          layer: 'MO',
          north: 6498599,
          east: 508826,
          srs: 'epsg:3006'
        },
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)'
        }
      }).then((response) => {
        // Basic response validation
        expect(response.status).to.eq(200);
        expect(response.headers).to.include({
          'content-type': 'application/json; charset=utf-8'
        });
        
        // Body structure validation
        expect(response.body).to.have.property('result');
        expect(response.body.result).to.be.an('array');
        
        // Example geometry validation (adjust based on actual API response)
        if (response.body.result.length > 0) {
          expect(response.body.result[0]).to.have.keys([
            'geometry',
            'properties',
            'type'
          ]);
        }
      });
    });
  });
  
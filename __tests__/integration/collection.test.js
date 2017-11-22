jest.mock('../../utils/json_placeholder');

const server = require('../../server');

const DEFAULT_AUTHORISED_REQUEST = {
  headers: {
    Authorization: `Bearer ${process.env.VALID_JWT}`,
  },
};

describe('Collection Endpoint', () => {
  it('Returns 501 without an Authoriszation header', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/collection',
    });

    expect(response.statusCode).toEqual(501);
  });

  it('GET /collection', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'GET',
      url: '/api/collection',
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toBeDefined();
    expect(Array.isArray(response.result.post)).toEqual(true);
    expect(Array.isArray(response.result.album)).toEqual(true);
    expect(Array.isArray(response.result.user)).toEqual(true);
    expect(response.result.post.length).toEqual(1);
    expect(response.result.album.length).toEqual(1);
    expect(response.result.album.length).toEqual(1);
  });
});

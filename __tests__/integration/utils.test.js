jest.mock('../../utils/json_placeholder');

const server = require('../../server');

const DEFAULT_AUTHORISED_REQUEST = {
  headers: {
    Authorization: `Bearer ${process.env.VALID_JWT}`,
  },
};

describe('Posts Endpoints', () => {
  it('Returns 501 without an Authoriszation header', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/posts',
    });

    expect(response.statusCode).toEqual(501);
  });

  it('GET posts', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'GET',
      url: '/api/posts',
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.result)).toEqual(true);
    expect(response.result.length).toEqual(1);
  });

  it('GET post by Id', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'GET',
      url: '/api/posts/1',
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.result)).toEqual(false);
    // expect(response.result).toEqual(1);
  });
});

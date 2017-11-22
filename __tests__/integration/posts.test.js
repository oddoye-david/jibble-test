'use strict';

jest.mock('../../utils/json_placeholder');

const server = require('../../server');

const DEFAULT_AUTHORISED_REQUEST = {
  headers: {
    Authorization: `Bearer ${process.env.VALID_JWT}`,
  },
};

describe('Posts Endpoints', () => {
  it('Should return 501 status code without an Authoriszation header', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/posts',
    });

    expect(response.statusCode).toEqual(501);
  });

  it('should GET posts', async () => {
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

  it('should GET post by Id', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'GET',
      url: '/api/posts/1',
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toBeDefined();
    expect(response.result.title === 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
  });

  it('should POST post', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'POST',
      url: '/api/posts',
      payload: {
        userId: 300,
        id: 250,
        title: 'Test',
        body: 'Foo Bar',
      },
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toBeDefined();
    expect(response.result.title === 'Test');
  });


  it('should return 400 given wrong key(s) for POST', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'POST',
      url: '/api/posts',
      payload: {
        foo: 300,
        id: 250,
        title: 'Test',
        body: 'Foo Bar',
      },
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(400);
  });

  it('PUT post', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'PUT',
      url: '/api/posts/1',
      payload: {
        userId: 300,
        id: 1,
        title: 'Test',
        body: 'Foo Bar',
      },
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
    expect(response.result).toBeDefined();
    expect(response.result.title === 'Test');
  });

  it('should return 400 given wrong key(s) for PUT', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'PUT',
      url: '/api/posts/1',
      payload: {
        foo: 300,
        id: 250,
        title: 'Test',
        body: 'Foo Bar',
      },
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(400);
  });

  it('DELETE post', async () => {
    const request = {
      ...DEFAULT_AUTHORISED_REQUEST,
      method: 'DELETE',
      url: '/api/posts/1',
    };
    const response = await server.inject(request);
    expect(response.statusCode).toEqual(200);
  });
});

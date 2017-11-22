const Joi = require('joi');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/api/posts',
    config: {
      description: 'Get Posts',
      notes: 'Returns all Posts',
      tags: ['api', 'posts'],
      handler: (_, response) => {
        response();
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/api/posts/{postId}',
    config: {
      description: 'Get Post',
      notes: 'Returns a specific Post',
      tags: ['api', 'posts'],
      handler: (_, response) => {
        response();
      },
      validate: {
        params: {
          postId: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'POST',
    path: '/api/posts',
    config: {
      description: 'Create a Post',
      notes: 'Creates a Post',
      tags: ['api', 'posts'],
      handler: (_, response) => {
        response();
      },
      validate: {
        payload: {
          title: Joi.string().required(),
        },
      },
    },
  });

  server.route({
    method: 'PUT',
    path: '/api/posts/{postId}',
    config: {
      description: 'Update a Post',
      notes: 'Updates a specific Post',
      tags: ['api', 'posts'],
      handler: (_, response) => {
        response();
      },
      validate: {
        params: {
          postId: Joi.string().required(),
        },
        payload: {
          title: Joi.string(),
        },
      },
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/posts/{postId}',
    config: {
      description: 'Delte a Post',
      notes: 'Deltes a specific Post',
      tags: ['api', 'posts'],
      handler: (_, response) => {
        response();
      },
      validate: {
        params: {
          postId: Joi.string().required(),
        },
      },
    },
  });

  return next();
};

exports.register.attributes = {
  name: 'posts',
};

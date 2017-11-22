'use strict';

const Joi = require('joi');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('./controller');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/api/posts',
    config: {
      description: 'Get Posts',
      notes: 'Returns all Posts',
      tags: ['api', 'posts'],
      handler: getPosts,
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  server.route({
    method: 'GET',
    path: '/api/posts/{postId}',
    config: {
      description: 'Get Post',
      notes: 'Returns a specific Post',
      tags: ['api', 'posts'],
      handler: getPost,
      validate: {
        params: {
          postId: Joi.string().required(),
        },
      },
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  server.route({
    method: 'POST',
    path: '/api/posts',
    config: {
      description: 'Create a Post',
      notes: 'Creates a Post',
      tags: ['api', 'posts'],
      handler: createPost,
      validate: {
        payload: {
          id: Joi.number().required(),
          userId: Joi.number().required(),
          title: Joi.string().required(),
          body: Joi.string().required(),
        },
      },
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  server.route({
    method: 'PUT',
    path: '/api/posts/{postId}',
    config: {
      description: 'Update a Post',
      notes: 'Updates a specific Post',
      tags: ['api', 'posts'],
      handler: updatePost,
      validate: {
        params: {
          postId: Joi.string().required(),
        },
        payload: {
          id: Joi.number().required(),
          userId: Joi.number().required(),
          title: Joi.string().required(),
          body: Joi.string().required(),
        },
      },
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  server.route({
    method: 'DELETE',
    path: '/api/posts/{postId}',
    config: {
      description: 'Delte a Post',
      notes: 'Deltes a specific Post',
      tags: ['api', 'posts'],
      handler: deletePost,
      validate: {
        params: {
          postId: Joi.string().required(),
        },
      },
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  return next();
};

exports.register.attributes = {
  name: 'posts',
};

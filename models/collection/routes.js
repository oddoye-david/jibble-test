'use strict';

const { getCollection } = require('./controller');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/api/collection',
    config: {
      description: 'Get Collection',
      notes: 'Returns Collection',
      tags: ['api', 'collection'],
      handler: getCollection,
      cache: process.env.CACHE_ON ? {
        expiresIn: 30 * 1000,
        privacy: 'private',
      } : undefined,
    },
  });

  return next();
};

exports.register.attributes = {
  name: 'collection',
};

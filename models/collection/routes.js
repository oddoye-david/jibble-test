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
    },
  });

  return next();
};

exports.register.attributes = {
  name: 'collection',
};

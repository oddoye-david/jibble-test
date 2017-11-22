exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/api/posts',
    config: {
      description: 'Get Posts',
      notes: 'Returns all Posts',
      tags: ['api', 'users'],
      handler: (_, response) => {
        response({ message: 'foo' })
      },
    },
  });

  return next();
};

exports.register.attributes = {
  name: 'posts',
};

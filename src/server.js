'use strict';

/*
  Imports
*/
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Boom = require('boom');
const path = require('path');
const glob = require('glob');

const { PORT, API_HOST, VALID_JWT } = require('./config');

/* Initialise Server */
const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port and CORS headers
server.connection({
  port: PORT || 3000,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
    },
  },
});

/**
 * Validate JWT on every request, before the handler function runs
 */
server.ext('onPreHandler', (request, response) => {
  if (request.url.path.includes('/api')) {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader || authorizationHeader !== `Bearer ${VALID_JWT}`) {
      response(Boom.notImplemented());
    } else {
      response.continue();
    }
  } else {
    response.continue();
  }
});

/* Swagger Options */
const swaggerOptions = {
  info: {
    title: 'Jibble Test API Documentation',
    version: '1.0.0',
    contact: {
      name: 'David Oddoye',
      email: 'oddoyedavid@gmail.com',
    },
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  basePath: '/api',
  pathPrefixSize: 2,
  host: `${API_HOST}:${PORT}`,
};

/**
 * Register Swagger Plugin
 */
server.register(
  [
    Inert,
    Vision,
    {
      register: HapiSwagger,
      options: swaggerOptions,
    },
  ],
  (err) => {
    if (err) {
      throw err;
    }
  },
);

// Look through the routes in
// all the subdirectories of models directory
// and create a new route for each routes file
const routeFilePaths = glob.sync('models/**/routes.js', { cwd: __dirname });
const plugins = routeFilePaths.map((routeFile) => {
  const routePluginPath = path.join(__dirname, routeFile);
  return require(`${routePluginPath}`); // eslint-disable-line
});


// Load plugins and start server
server.register(plugins, (routesErr) => {
  if (routesErr) {
    throw routesErr;
  }

  // If server is being imported, ie for tests, don't start
  if (!module.parent) {
    // Start the server
    server.start((serverStartErr) => {
      if (serverStartErr) {
        throw serverStartErr;
      }

      console.log(`
      ==================================================
      Server running on ${API_HOST}:${PORT}
      ==================================================
      Docs at ${API_HOST}:${PORT}/documentation
      ==================================================
      `);
    });
  }
});

module.exports = server;

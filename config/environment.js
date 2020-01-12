'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'danger-room',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_MODULE_UNIFICATION: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth': {
      authenticationRoute: 'login',
      auth0: {
        clientID: process.env.AUTH0_CLIENT_ID,
        domain: process.env.AUTH0_DOMAIN,
        logoutReturnToURL: '/logout',
        enableImpersonation: false,
        silentAuth: {},
      },
    },
  };

  ENV.contentSecurityPolicy = {
    'font-src': "'self' data: https://*.auth0.com",
    'script-src': "'self' 'unsafe-eval' https://*.auth0.com",
    'connect-src': "'self' http://localhost:* https://mcdb.auth0.com",
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};

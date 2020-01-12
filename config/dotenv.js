/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: ['AUTH0_CLIENT_ID', 'AUTH0_DOMAIN'],
    //fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};

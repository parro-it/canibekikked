'use strict';

const canibekiked = require('.');
canibekiked()
  .then(results => {
    results.on('error', console.error);
    results.on('package-checked', console.log);
    results.on('end', () => console.log('end'));
  })
  .catch(console.error);

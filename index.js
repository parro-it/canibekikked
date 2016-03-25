'use strict';

const co = require('co');
const pify = require('pify');
const whoami = pify(require('npm-whoami'));
const authorPackages = pify(require( 'npm-list-author-packages'));
const isTrademarked = require('is-trademarked');
const EventEmitter = require('events');

const checkOnePackage = results => name =>
  isTrademarked(name)
    .then(trademarks => {
      results.emit('package-checked', { name, trademarks});
    })
    .catch(err => results.emit('error', err));


module.exports = co.wrap(function * canibekiked(user) {
  const username = user || (yield whoami());
  const packages = yield authorPackages({ username });

  const results = new EventEmitter();
  const checksCompleted = packages.map(checkOnePackage(results));

  Promise.all(checksCompleted).then(() => results.emit('end'));

  return results;
});

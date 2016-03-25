const test = require('tape');
const canibekiked = require('./');

test('it work!', t => {
  const result = canibekiked();
  t.equal(result, 42);
  t.end();
});

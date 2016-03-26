#!/usr/bin/env node
'use strict';
const ora = require('ora');
const canibekiked = require('canibekiked-api').default;
const spinner = ora('Retrieving packages');
const logSymbols = require('log-symbols');
const meow = require('meow');
const updateNotifier = require('update-notifier');

const cli = meow(`
  Usage:
    canibekiked [user]

  * user - NPM username, defaults to currently logged.
  * options:
    -t/--token      Use your own API token
    -v/--version    Print version
    -h/--help       Print help
`, {
  alias: {
    v: 'version',
    h: 'help',
    t: 'token'
  },
  string: ['_']
});

updateNotifier({pkg: cli.pkg}).notify();

spinner.start();

function fail(err) {
  process.stderr.write(`Unexpected error:\n${err.stack}\n`);
}

function trademarkedLog(p) {
  return `${logSymbols.error} Package ${p.name} ` +
    `has a trademarked name:
    ${p.trademarks.map(t => `
      wordmark:${t.wordmark}
      reg:${t.reg}
      description:${t.description}
      sn:${t.sn}
      serviceCode:${t.serviceCode}
    `)}\n`;
}

canibekiked(cli.input[0])
  .then(results => {
    results.on('package-checking', name => {
      spinner.color = 'yellow';
      spinner.text = `Checking ${name}`;
    });

    results.on('error', fail);

    results.on('package-checked', res => {
      if (res.trademarks) {
        spinner.color = 'red';
        spinner.text = `Package ${res.name} has a trademarked name!`;
      } else {
        spinner.color = 'green';
        spinner.text = `Package ${res.name} is not trademarked.`;
      }
    });

    results.on('end', (passed, failed) => {
      spinner.stop();
      process.stdout.write(`${logSymbols.success} ${passed} packages has not trademarked names.\n`);
      process.stdout.write(failed.map(trademarkedLog).join(''));
    });
  })
  .catch(fail);

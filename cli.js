#!/usr/bin/env node
'use strict';
const ora = require('ora');
const canibekiked = require('canibekiked-api').default;
const logSymbols = require('log-symbols');
const meow = require('meow');
const chalk = require('chalk');
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


function fail(err) {
  process.stderr.write(`Unexpected error:\n${err.stack}\n`);
}

function trademarkedLog(p) {
  const description = tr =>
    tr.description.toLowerCase().replace(/\n/g, '\n\t');

  return '\n' +
    `${logSymbols.error} Package ${chalk.cyan(p.name)} ` +
    `has a trademarked name:\n` +
    p.trademarks.map(t =>
      `${chalk.cyan(t.wordmark.trim())} is a trademark registered in ${t.reg.getFullYear()}\n` +
      `S/N:\t${t.sn}\n` +
      `Service code:\t${t.serviceCode}\n` +
      `${chalk.gray(description(t))}\n`
    ).join('');
}

const resultsLog = spinner => results =>{
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
};

const spinner = ora('Retrieving packages');

updateNotifier({pkg: cli.pkg}).notify();

spinner.start();

canibekiked(cli.input[0])
  .then(resultsLog(spinner))
  .catch(fail);

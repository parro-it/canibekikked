#!/usr/bin/env node
'use strict';
const ora = require('ora');
const canibekikked = require('canibekikked-api').default;
const logSymbols = require('log-symbols');
const meow = require('meow');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');

const cli = meow(`
  Usage:
    canibekikked [user]

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

  return `\n${logSymbols.error} ` +
    p.trademarks.map(t =>
      `${chalk.cyan(t.wordmark.trim())} is a trademark registered in ${t.reg.getFullYear()}\n` +
      `S/N:\t${t.sn}\n` +
      `Service code:\t${t.serviceCode}\n` +
      `${chalk.gray(description(t))}\n`
    ).join('');
}

const resultsLog = (spinner, results) =>{
  results.on('package-checking', pkg => {
    spinner.color = 'yellow';
    spinner.text = `Checking ${pkg.name}`;
  });

  results.on('error', fail);

  results.on('package-checked', pkg => {
    if (pkg.trademarks) {
      spinner.color = 'red';
      spinner.text = `Package ${pkg.name} has a trademarked name!`;
    } else {
      spinner.color = 'green';
      spinner.text = `Package ${pkg.name} is not trademarked.`;
    }
  });

  results.on('end', (passed, failed) => {
    spinner.stop();
    process.stdout.write(`${logSymbols.success} ${passed} package names have not been trademarked.\n`);
    process.stdout.write(failed.map(trademarkedLog).join(''));
  });

  return results.start();
};

const spinner = ora('Retrieving packages');

updateNotifier({pkg: cli.pkg}).notify();

spinner.start();

const token = cli.flags.token;
const options = token ? { token } : undefined;
const results = canibekikked(cli.input[0], options);
resultsLog(spinner, results).catch(fail);

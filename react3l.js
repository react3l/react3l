#!/usr/bin/env node

const fs = require('fs');
const {Command} = require('commander');
const tsConfig = require('./tsconfig.json');

const program = new Command();

program.command('enable-emit')
  .action(() => {
    tsConfig.compilerOptions.noEmit = false;
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
    console.log('TS compilerOption `noEmit` updated');
  });

program.command('disable-emit')
  .action(() => {
    tsConfig.compilerOptions.noEmit = true;
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
    console.log('TS compilerOption `noEmit` updated');
  });

program.parse(process.argv);

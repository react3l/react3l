const { exec, execSync } = require('child_process');
const program = require('commander');
const chalk = require('chalk');

const execOptions = {
  encoding: 'utf-8',
  stdio: [
    process.stdout,
    process.stderr
  ]
};

program
  .arguments('<name>')
  .option('-w, --watch', 'Watch option', false)
  .action(async (name) => {
    const { watch } = program;

    const docParams = [
      'typedoc',
      '--out',
      `docs/${name}`,
      `libs/${name}`
    ];

    let webProcess;

    if (watch) {
      docParams.push('--watch');

      const webParams = [
        'static',
        `docs/${name}`
      ];
      webProcess = exec(`yarn ${webParams.join(' ')}`, execOptions);
    }

    const docProcess = exec(`yarn ${docParams.join(' ')}`, execOptions);

    process.on('SIGINT', () => {
      console.log();
      docProcess.kill();
      console.info(chalk.yellowBright('Docs process killed'));
      if (watch) {
        webProcess.kill();
        console.info(chalk.yellowBright('Web process killed'));
      }
    });
  });

program.command('build:all')
  .action(() => {
    [
      'react3l-common',
      'react3l-decorators',
      'react3l-localization',
      'react3l-axios-observable',
      'react3l-advanced-filters',
    ].forEach((name) => {
      execSync(`yarn docs ${name}`);
    });
  });

program.parse(process.argv);

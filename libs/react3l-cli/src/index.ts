import {Command} from 'commander';
import {GenSchematic} from './GenSchematic';
import {CleanableResource} from './CleanableResource';
import {generateComponent} from './functions/generate-component';
import {generateModel} from './functions/generate-model';
import {generateRepository} from './functions/generate-repository';
import {generateService} from './functions/generate-service';
import {cleanAsset} from './functions/clean-asset';
import {cleanScss} from './functions/clean-scss';
import {merge} from './helpers/merge';
import {extract} from './helpers/extract';
import {generateFilter} from './functions/generate-filter';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {description, version} = require('../package.json');

const program = new Command();

program
  .version(version)
  .description(description);

function generateAction(schematic: GenSchematic, name: string) {
  switch (schematic) {
    case GenSchematic.COMPONENT:
      generateComponent(program, name);
      break;

    case GenSchematic.MODEL:
      generateModel(program, name);
      break;

    case GenSchematic.REPOSITORY:
      generateRepository(program, name);
      break;

    case GenSchematic.SERVICE:
      generateService(program, name);
      break;

    case GenSchematic.FILTER:
      generateFilter(program, name);
      break;

    default:
      console.log('Schematic must be "component" | "service" | "repository" | "model" | "filter"');
      break;
  }
}

program
  .option('-s, --scss', 'Add scss support')
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('generate <schematic> <name>')
  .description('Generate component, service, repository and model')
  .action(generateAction);

program
  .option('-s, --scss', 'Add scss support')
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('g:c <name>')
  .description('Generate component (alias)')
  .action((name: string) => {
    generateAction(GenSchematic.COMPONENT, name);
  });

program
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('g:m <name>')
  .description('Generate model (alias)')
  .action((name: string) => {
    generateAction(GenSchematic.MODEL, name);
  });

program
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('g:r <name>')
  .description('Generate repository (alias)')
  .action((name: string) => {
    generateAction(GenSchematic.REPOSITORY, name);
  });

program
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('g:s <name>')
  .description('Generate service (alias)')
  .action((name: string) => {
    generateAction(GenSchematic.SERVICE, name);
  });

program
  .option('-d, --dest <dest>', 'Destination directory', '.')
  .command('g:f <name>')
  .description('Generate filter (alias)')
  .action((name: string) => {
    generateAction(GenSchematic.FILTER, name);
  });

function cleanAction(resource: CleanableResource, path?: string) {
  switch (resource) {
    case CleanableResource.ASSET:
      cleanAsset(program);
      break;

    case CleanableResource.SCSS:
      cleanScss(path);
      break;

    default:
      console.log('Resource must be "asset" | "scss"');
      break;
  }
}

program
  .option('-a, --asset <assetDir>', 'Asset folder')
  .option('-s, --source <sourceDir>', 'Source folder')
  .command('clean <assetType> [path]')
  .description('Clean resources (asset files, scss classes)')
  .action((assetType: CleanableResource, path?: string) => {
    switch (assetType) {
      case CleanableResource.SCSS:
        cleanAction(CleanableResource.SCSS, path);
        break;
      default:
      case CleanableResource.ASSET:
        cleanAction(CleanableResource.ASSET);
        break;
    }
  });

function handleTranslateAction(action: 'extract' | 'merge') {
  switch (action) {
    case 'extract':
      extract(program);
      break;

    case 'merge':
      merge(program);
      break;

    default:
      console.log('Command must be "extract" or "merge"');
      break;
  }
}

program
  .option('-i, --input <inputPath>', 'Input path', 'src/')
  .option('-o, --output <outputPath>', 'Output path', 'public/assets/i18n/')
  .option('-p, --partials <partialPath>', 'Partial path', 'public/assets/i18n/partials/')
  .option('-ic, --include <include>', 'Include pattern', '\\.(js|jsx|ts|tsx)$')
  .option('-ex, --exclude <exclude>', 'Exclude pattern', '\\.(spec|test)\\.(js|jsx|ts|tsx)$')
  .option('-ks, --key-separator <keySeparator>', 'Key separator', '.')
  .option('-is, --indent-size <indent>', 'Indent size', '2')
  .option('-l, --languages <languages...>', 'Supported languages')
  .option('-m, --marker <marker>', 'Translate marker', 'translate')
  .command('translate <action>')
  .description('action: extract | merge')
  .action(handleTranslateAction);

program.parse(process.argv);

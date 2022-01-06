import {Command} from 'commander';
import {description, version} from '../package.json';
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

const program: Command & {
  //
} = new Command();

program
  .version(version)
  .description(description);

function generateAction(schematic: GenSchematic, name: string) {
  switch (schematic) {
    case GenSchematic.COMPONENT:
      generateComponent(name);
      break;

    case GenSchematic.MODEL:
      generateModel(name);
      break;

    case GenSchematic.REPOSITORY:
      generateRepository(name);
      break;

    case GenSchematic.SERVICE:
      generateService(name);
      break;

    default:
      console.log('Schematic must be "component" | "service" | "repository" | "model"');
      break;
  }
}

program
  .command('generate <schematic> <name>')
  .description('Generate component, service, repository and model')
  .action(generateAction);

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
  .command('clean asset')
  .description('Clean resources (asset files, scss classes)')
  .action(() => {
    cleanAction(CleanableResource.ASSET);
  });

program
  .command('clean scss <path>')
  .description('Clean resources (asset files, scss classes)')
  .action((path: string) => {
    cleanAction(CleanableResource.SCSS, path);
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

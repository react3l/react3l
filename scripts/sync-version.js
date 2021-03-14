const advancedFilters = require('../src/advanced-filters/package.json');
const axiosObservable = require('../src/axios-observable/package.json');
const common = require('../src/common/package.json');
const decorators = require('../src/decorators/package.json');
const localization = require('../src/localization/package.json');

const react3l = require('../package.json');

const fs = require('fs');

const subLibs = [
  advancedFilters,
  axiosObservable,
  common,
  decorators,
  localization
]

const subPaths = [
  'src/advanced-filters/package.json',
  'src/axios-observable/package.json',
  'src/common/package.json',
  'src/decorators/package.json',
  'src/localization/package.json',
]

const {version, publishConfig} = react3l;

subLibs.forEach((subLib, index) => {
  Object.assign(subLib, {
    version,
    publishConfig
  })
  fs.writeFileSync(subPaths[index], JSON.stringify(subLib, null, 2));
})

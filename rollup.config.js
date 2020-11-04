import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import fs from 'fs';
import path from 'path';
import multiInput from 'rollup-plugin-multi-input';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import tsConfig from './tsconfig.json';

const files = [];

(function getInputFiles(dir) {
  fs.readdirSync(dir).forEach((entry) => {
    if (entry !== '.' && entry !== '..') {
      const entryPath = path.resolve(dir, entry);
      if (fs.lstatSync(entryPath).isDirectory()) {
        getInputFiles(entryPath);
        return;
      }
      files.push(entryPath);
    }
  });
})('src');

export default {
  input: files,
  output: {
    dir: tsConfig.compilerOptions.outDir,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    multiInput(),
    external(),
    url(),
    json(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
  ],
};

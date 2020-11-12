import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import fs from 'fs';
import path from 'path';
import multiInput from 'rollup-plugin-multi-input';
import external from 'rollup-plugin-peer-deps-external';
import tsConfig from './tsconfig.json';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const babelConfig = require('./babel.config');

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
    multiInput({
      relative: './src/',
    }),
    external(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.node'],
      modulesOnly: true,
    }),
    url(),
    json(),
    commonjs({
      sourceMap: true,
      transformMixedEsModules: true,
    }),
    babel({
      ...babelConfig,
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.node'],
      sourceType: 'module',
      minified: true,
      comments: false,
    }),
    typescript({
      include: ['src/'],
    }),
  ],
};

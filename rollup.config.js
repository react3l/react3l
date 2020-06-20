import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import multiInput from 'rollup-plugin-multi-input';
import {DEFAULT_EXTENSIONS} from '@babel/core';
import pkg from './package.json';

function findTSFiles(root, files) {
  if (fs.existsSync(root)) {
    if (fs.lstatSync(root).isDirectory()) {
      fs.readdirSync(root)
        .forEach((filename) => {
          const p = path.join(root, filename);
          findTSFiles(p, files);
        });
    } else {
      if (root.match(/\.tsx?$/)) {
        if (!root.match(/\.(d|test|spec)\.ts/)) {
          files.push(root);
        }
      }
    }
  }
}

const inputFiles = [];
findTSFiles('src', inputFiles);
const dependencies = Object.keys(pkg.dependencies);

export default {
  external(id) {
    return dependencies.includes(id);
  },
  input: inputFiles,
  output: {
    exports: 'named',
    sourcemap: true,
    format: 'esm',
    dir: 'dist',
  },
  plugins: [
    external(),
    url(),
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      preferBuiltins: true,
    }),
    json(),
    multiInput({
      relative: 'src/',
      transformOutputPath: (output) => {
        return `${output}`;
      },
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    babel({
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
        '.tsx',
      ],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [
        'macros',
      ],
    }),
  ],
};

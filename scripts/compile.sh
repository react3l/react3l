#!/usr/bin/env bash

yarn test --watchAll=false
yarn build
cp -r build/* dist/

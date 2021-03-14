# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- The full documentation

## [6.0.0] - 2021-03-14
### Breaking changes
#### @react3l/react3l
- Restructure project into separate packages:
  - `advanced-filters`
  - `axios-observable`
  - `common`
  - `decorators`
  - `localization`
#### @react3l/common
- Add some useful hooks:
  - useEffectSubscription
  - useTimeout
  - useInterval
  - useBoolean
- Add some useful reducers:
  - booleanReducer
  - listReducer
  - countingReducer
- Add relational methods to `Model` class:
  - hasMany
  - belongsTo
#### @react3l/axios-observable
- Rewrite `Axios` class
#### @react3l/decorators
- Add decorators
#### @react3l/localization
- Restructured in a separate package

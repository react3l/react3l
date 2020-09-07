@react3l/react3l
----------------

React3L v4 has been fully rewritten from scratch. This repository now contains the core code, common services and repositories which are used in almost cases (both for web and mobile)

# Installation

Config `.nmprc` to download packages from GitHub registry:
```npmrc
@react3l:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org
```

Install packages:
```sh
yarn add @react3l/react3l axios rxjs @react3l/axios-observable moment react-i18next i18next yup
```

Install dev packages:
```sh
yarn add -D react3l-cli i18next-extractor npm-run-all
```

#### Repository

Repository is the layer which contains all data accession code. (HTTP API, LocalStorage, AsyncStorage, Database, ...).

Most of repository's methods are API calls, which can be Promise or Observable (rxjs).

If a repository data access task is asynchronous and called in an `useEffect()` hook, it must be unsubscribed and cleaned up in the returned cleanup function. You should use Observable to handle this.

All repositories must extend the base Repository class.

#### Service

Service is the business layer. It is just a class whose methods are custom hooks or pure functions to handle logic of a specific domain.

All custom hooks and custom hook calls should respect the Single-Purpose principle. Each service should handle logic for only one domain. Each method should handle only one specific logic of its domain.

#### View

View is the presentation layer. (It's called `view` on Web and `screen` on Mobile app).

A view should be a component which contains only JSX and service calls to render.


#### Model

Model is the name of all objects in the app:
- Data access object
- Data transfer object
- Business object

Because Javascript is a dynamic language. It does not require all fields of an object to explicitly have a value. All fields can be safely defined in the class. The property's values of their instances will be assigned in the data access layer where they are defined.

#### Internationalization

react3l use `i18next` and `react-i18next` packages for internationalization. We provide a CLI package [i18next-extractor](https://github.com/react3l/i18next-extractor#readme) for managing the translation resources

- Define the languages
- Extracting the language keys
- Merging the translated files (JSON format)


<div align="center">

<h1>Strict optimized React starter</h1>

![ci](https://github.com/blephy/allandolle-portfolio/workflows/ci/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=alert_status)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=security_rating)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=coverage)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=ncloc)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=bugs)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=code_smells)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=blephy_allandolle-portfolio&metric=sqale_index)](https://sonarcloud.io/dashboard?id=blephy_allandolle-portfolio)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT licensed](https://img.shields.io/github/license/blephy/allandolle-portfolio?style=flat-square)](hhttps://github.com/blephy/allandolle-portfolio/master/LICENSE)

</div>

## Getting started

### Prerequired

- npm _>6_
- node _>12_

```shell
node -v
npm -v
```

### Installation

Fetch sources.

```shell
git clone https://github.com/blephy/strict-optimized-react-starter.git
cd strict-optimized-react-starter
npm i
```

Create a `.env` file in the root directory.

```shell
touch .env
```

Add these lines and save.

```txt
API_URL=localhost:3001/api/v1
DOMAIN_NAME=localhost:3001
PORT=3001
HTTPS=false
CT_REPORT_URI=https://allandolle.report-uri.com/r/d/ct/enforce
CSP_REPORT_URI=https://allandolle.report-uri.com/r/d/csp/enforce
APP_TITLE=My application html title
```

### Run developement server

Start the development server with _live reload_ and _hot module replacement_.

Open the app on `localhost:3000`.

```shell
npm start
```

### Build production ready bundle

```shell
npm run build
```

### Start the prodution server

Start the nodejs production server with a SPA fallback.

Server is listening on `localhost:3001`. Port depending on `PORT` informed in `.env` file.

```shell
npm run start:prod
```

### Lint and format the code

Lint with [eslint](https://eslint.org/), [stylelint](https://stylelint.io/), [markdownlint](https://github.com/igorshubovych/markdownlint-cli) and [htmlhint](https://htmlhint.com/).
Format with [prettier](https://prettier.io/).

```shell
npm run lint
```

### Autofix lint and format the code

Autofix with [eslint](https://eslint.org/), [stylelint](https://stylelint.io/) and [markdownlint](https://github.com/igorshubovych/markdownlint-cli).
Format with [prettier](https://prettier.io/).

```shell
npm run lint:fix
```

### Test the application

Run [Jest](https://jestjs.io/) with [Enzyme](https://github.com/enzymejs/enzyme/) to test the React application. Collect coverage under `coverage/` folder.

```shell
npm run test
```

Run Jest in watch mode without collecting coverage.

```shell
npm run test:watch
```

### Types check your typescript files

```shell
npm run ts:check
```

### Bundle stats

Visualize your bundle stats with [webpack bundle analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```shell
npm run stats
```

### Browserslist

Visualize your bundle browsers targets with browserslist queries. You can change queries on `.browserslistrc` file.

```shell
npm run browsers
```

Alternatively, you can have more informations with :

```shell
# See targeted users in the world
npm run browsers:coverage
# See autoprefixer rules
npm run browsers:autoprefixer
```

## Contributing

### Install VSCode extensions

In order to lint and format your code while you are typing in VSCode, please install extensions in `.vscode/extensions.json`. Alternatively, go to the VSCode extensions panel and type `@recommended`.

## Links

- [Structured data linter](http://linter.structured-data.org/)
- [Structured data testing tool](https://search.google.com/structured-data/testing-tool/)

## Known issues

- Changing `browserslist` queries are not reflected by `babel`. This is a `babel-loader` cache [issue](https://github.com/babel/babel-loader/issues/690). You can remove yourself `node_modules/.cache/babel-loader/` to clean the cache.

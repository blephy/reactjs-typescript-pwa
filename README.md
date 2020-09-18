# Allan Dollé's portfolio - React starter

![build](https://github.com/blephy/allandolle-portfolio/workflows/build/badge.svg)
![lint](https://github.com/blephy/allandolle-portfolio/workflows/lint/badge.svg)
![tests](https://github.com/blephy/allandolle-portfolio/workflows/tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/blephy/allandolle-portfolio/badge.svg)](https://coveralls.io/github/blephy/allandolle-portfolio)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This app is running on production at <https://allandolle-portfolio.herokuapp.com/>.

## Getting started

### Prerequired

- npm _>6_
- node _>12_

```shell
node -v
npm -v
```

### Installation

```shell
git clone https://github.com/blephy/allandolle-portfolio.git
cd allandolle-portfolio
npm i
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

Server is listening on `localhost:3001`.

```shell
npm run start:prod
```

### Lint and format the code

Lint with [eslint](https://eslint.org/), [stylelint](https://stylelint.io/) and [markdownlint](https://github.com/igorshubovych/markdownlint-cli). Format with [prettier](https://prettier.io/).

```shell
npm run lint
```

### Autofix lint and format the code

Autofix with [eslint](https://eslint.org/), [stylelint](https://stylelint.io/) and [markdownlint](https://github.com/igorshubovych/markdownlint-cli). Format with [prettier](https://prettier.io/).

```shell
npm run lint:fix
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
npm run browserslist
```

## Contributing

### Install VSCode extensions

In order to lint and format your code while you are typing in VSCode, please install extensions below `.vscode/extensions.json`. Go to the VSCode extensions panel and type `@recommended`.

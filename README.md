# Portfolio

This app is running on production at <https://allandolle-portfolio.herokuapp.com/>.

## Getting started

### Prerequired

- npm _>6.14_
- node _>12.18_
- git

```shell
node -v
npm -v
```

### Installation

```shell
git clone https://github.com/blephy/allandolle-portfolio.git
cd react-redux
npm i
```

### Run developement server

Start the development server with live reload and hot module replacement. Will open the app on `localhost:3000`.

```shell
npm start
```

### Build production ready assets / bundle

```shell
npm run build
```

### Start the prodution server

Start the production ready nodejs server with a SPA fallback. Don't forget to build the app first with `npm run build`. Server is listening on `localhost:3001`.

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

## Contributing

### Install VSCode extensions

In order to lint and format your code while you are typing, please install extension below `.vscode/extensions.json`. Go to the extension panel and type `@recommended`.

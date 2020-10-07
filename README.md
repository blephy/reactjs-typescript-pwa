<div align="center">
  <img src="https://user-images.githubusercontent.com/24233935/95027324-d9de8780-0697-11eb-983e-52c187ba1e62.png" width="350" height="auto" alt="ReactJS Progressive Web App">

  <h1>ReactJS TypeScript Progressive Web App</h1>

![ci](https://github.com/blephy/allandolle-portfolio/workflows/ci/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=alert_status)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=security_rating)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=coverage)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=ncloc)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=bugs)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=code_smells)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=reactjs-typescript-pwa&metric=sqale_index)](https://sonarcloud.io/dashboard?id=reactjs-typescript-pwa)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT licensed](https://img.shields.io/github/license/blephy/allandolle-portfolio?style=flat-square)](hhttps://github.com/blephy/allandolle-portfolio/master/LICENSE)

</div>
<hr>

<p align=center>
  A fast and full TypeScript PWA built with React with every best practices for SEO and web performances
</p>

<p align=center>
  <img width="550" height="auto" alt="Lighthouse report PWA ReacJS" src="https://user-images.githubusercontent.com/24233935/95028011-4f008b80-069d-11eb-9fae-62ed7efb5192.png">
</p>

## Features

- Full TypeScript project. Even [webpack](https://github.com/webpack/webpack) configuration !
- Add css prefix on the fly with [autoprefixer](https://github.com/postcss/autoprefixer).
- Minify your css bundle with [css minimizer webpack plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin).
- Css reset (normalize and sanitize) with [postcss-normalize](https://github.com/csstools/postcss-normalize).
- Add polyfills on the fly with [babel](https://babeljs.io/).
- Compress and beautify your svg with [svgo](https://github.com/svg/svgo).
- Transforms your svg into React components with [svgr](https://github.com/gregberge/svgr).
- Auto lint and format on file save with [eslint](https://github.com/eslint/eslint), [stylelint](https://github.com/stylelint/stylelint), [markdownlint](https://github.com/markdownlint/markdownlint), [prettier](https://prettier.io/).
- Use under the hood two [browserslist](https://github.com/browserslist/browserslist) configurations for best development performance and good production accessibility.
- Lazy load components with the recommanded [loadable components](https://loadable-components.com/) package.
- Convert your png and jpg files into the new modern webp format, compress them, and produce different resolutions for responsive images with [responsive-loader](https://github.com/dazuaz/responsive-loader).
- Preload fonts, css, and js that are required as quickly as possible by your users with [preload webpack plugin](https://github.com/googlechromelabs/preload-webpack-plugin).
- Add async and crossorigin attributes to your assets with [script ext html webpack plugin](https://github.com/numical/script-ext-html-webpack-plugin).
- Prevent circular dependencies with [circular dependencies plugin](https://github.com/aackerman/circular-dependency-plugin).
- Get notified by linting issue directly on your browser while your are typing code with [eslint webpack plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) and [stylelint webpack plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin).
- Minify your javascript bundle with [terser webpack plugin](https://github.com/webpack-contrib/terser-webpack-plugin).
- Produce a web application manifest that is compliant by all web plateform (ios, android, desktop, mobile ...) with [webpack pwa manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)
- Add a sitemap to your pwa with [sitemap webpack plugin](https://github.com/schneidmaster/sitemap-webpack-plugin)
- Add a robots.txt, humans.txt, security.txt to your bundle with [copy webpack plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
- Produce a service worker to precache your files in browsers with [workbox](https://github.com/GoogleChrome/workbox)

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
git clone https://github.com/blephy/reactjs-typescript-pwa.git
cd reactjs-typescript-pwa
npm i
```

Create a `.env` file in the root directory.

```shell
touch .env
```

Add these lines and save.

```txt
# Needed by the server and the app (CORS / SEO...)
DOMAIN_NAME=localhost:3001
PORT=3001
HTTPS=false

# Currently not exploited
API_URL=localhost:3001/api/v1

# Report URI https://report-uri.com/
CT_REPORT_URI=https://reactjstypescriptpwa.report-uri.com/r/d/ct/enforce
CSP_REPORT_URI=https://reactjstypescriptpwa.report-uri.com/r/d/csp/enforce
API_REPORT_URI=https://reactjstypescriptpwa.report-uri.com/a/d/g
```

### Commands

| Command                         | Description                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm start`                     | Run the development server with live and hot reload.                                                        |
| `npm run build`                 | Build the application and the service-worker. Production usage                                              |
| `npm run build:local`           | Build the application and the service-worker with debug mode. Run in conjunction with `npm run start:prod`. |
| `npm run start:prod`            | Run the NodeJS production ready server to deliver assets. Also for local production debugging purpose.      |
| `npm test`                      | Run the application tests and produce a coverage report under `coverage/` folder.                           |
| `npm run test:watch`            | Run the application tests in watch mode. Usefull to iterate over your tests                                 |
| `npm run lint`                  | Lint and format the code base. With Eslint, Stylelint, Markdownlint, Htmllint, Prettier                     |
| `npm run lint:fix`              | Autofix Linting and formating the code base. With Eslint, Stylelint, Markdownlint, Prettier                 |
| `npm run ts:check`              | Typecheck the code base with TypeScript                                                                     |
| `npm run stats`                 | Build the application and visualize your bundle stats. Will launch a server with webpack-bundle-analyzer    |
| `npm run browsers`              | See your Browserslist targeted browsers                                                                     |
| `npm run browsers:coverage`     | See how many % you target people in the world                                                               |
| `npm run browsers:autoprefixer` | See autoprefixer css prefixes used                                                                          |
| `npm run clean`                 | Delete stats, coverage, and build folders                                                                   |

## How to

### Use alias in your path

By default, you can use `@/` prefix in your path to resolve `src` folder. Even in `url` directive in `scss` files.

```scss
@font-face {
  font-display: swap;
  font-family: 'Open Sans Light';
  src: url('@/fonts/open-sans/OpenSans-Light.woff2') format('woff2'); // Resolve src/fonts/...
}
```

```ts
import App from '@/app' // Resolve src/app.tsx
```

### Use css module

You can convert an `.scss` into a css module simply by suffixing it's name with `module.scss`.

### Use svg files

SVG files can be imported as mentioned below. Note that all svg files are optimized with [svgo](https://github.com/svg/svgo). You can configure svgo in the `.svgo.yml` file.

```tsx
import React from 'react'

import { ReactComponent as MySvg } from '@/images/signature.svg'

import styles from './styles.module.scss'

const MyComponent: React.ReactNode = () => <MySvg className={styles.mySvg} />
```

```scss
.mySvg {
  width: 80px;

  path {
    stroke: #fff;
  }

  circle {
    animation: draw-circle 0.25s ease-in 1.5s forwards;
  }
}
```

### Use images files

You can import `.png` and `.jpe?g` as mentioned below. Note that all this files are processed with [responsive-loader](https://github.com/dazuaz/responsive-loader). This will convert files in optimized web format `webp`, and automatically create multiple sizes for responsive images. Read the responsive-loader documentation.

```tsx
// Automatic way
import PwaReact from '@/images/pwa-react-uhd-trans.png'
// Custom way
import PwaReact from '@/images/pwa-react-uhd-trans.png?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp'
// do not convert into webp
import PwaReact from '@/images/pwa-react-uhd-trans.png?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048'

import styles from './styles.module.scss'

const MyComponent: React.ReactNode = () => (
  <img
    className={styles.image}
    src={PwaReact.src}
    srcSet={PwaReact.srcSet}
    sizes='(max-width: 1024px) 320px,
      500px'
    width={PwaReact.width}
    height={PwaReact.height}
    alt='Pwa React'
  />
)
```

## Contributing

### Install VSCode extensions

In order to lint and format your code while you are typing in VSCode, please install extensions in `.vscode/extensions.json`. Alternatively, go to the VSCode extensions panel and type `@recommended`.

## Links

- [Structured data linter](http://linter.structured-data.org/)
- [Structured data testing tool](https://search.google.com/structured-data/testing-tool/)
- [Open Graph protocol](https://ogp.me/)
- [Open Graph debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [Twitter Card validator](https://cards-dev.twitter.com/validator)
- [React Helmet for SEO in App](https://github.com/nfl/react-helmet)
- [Performance budget](https://www.performancebudget.io/)
- [Speed Curve](https://speedcurve.com/)

## Known issues

- Changing `browserslist` queries are not reflected by `babel`. This is a `babel-loader` cache [issue](https://github.com/babel/babel-loader/issues/690). You can remove yourself `node_modules/.cache/babel-loader/` to clean the cache.
- Webpack pwa manifest not compatible with typescript. If you set a property `purpose` on an icon, typescript complain about type checking. [issue](https://github.com/arthurbergmz/webpack-pwa-manifest/issues/139)
- When using css module (`my-module.module.scss`), and insert a `@keyframe`, `cssnano` don't produce an hash very well to the related animation name. Just rename your keyframe from `draw` to `my-draw`. [issue](https://github.com/cssnano/cssnano/issues/909). [PR](https://github.com/cssnano/cssnano/pull/941)

import { Config } from './@types/config.d'

const config: Config = {
  app: {
    title: 'ReactJS Progressive Web App',
    version: '1.0.0',
    short_name: 'ReactPWA',
    lang: 'en',
    meta: {
      description:
        'A fast and secure Progressive Web App built with ReactJS with every best practices for SEO and web performances. Full TypeScript !',
      viewport: 'width=device-width, initial-scale=1',
      robots: 'noodp'
    },
    favicon: 'public/favicon.32.png'
  },
  env: {
    development: {
      domainName: 'localhost',
      port: 3000,
      https: false,
      devTools: 'eval-cheap-module-source-map'
    },
    local: {
      domainName: 'localhost',
      port: 3001,
      https: false,
      devTools: 'source-map',
      cache: false
    }
  },
  pwa: {}
}

export default config

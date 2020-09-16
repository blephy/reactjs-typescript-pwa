/* eslint-disable global-require */
import App from '@src/app'
import React from 'react'
import { render } from 'react-dom'
import routes from './app.routes'

const DOM_NODE: HTMLElement = document.querySelector('.app-wrapper')

render(<App routes={routes} />, DOM_NODE)

/**
 * Hot module replacement snippet for local development
 * */
if (process.env.NODE_ENV === 'development' && module && module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NewApp = require('./app').default

    render(<NewApp />, DOM_NODE)
  })
}

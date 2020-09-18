/* eslint-disable global-require, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires */
import React from 'react'
import { render } from 'react-dom'

import App from '@/app'

import routes from './app.routes'

const DOM_NODE: HTMLElement = document.querySelector('.app-wrapper')

render(<App routes={routes} />, DOM_NODE)

/**
 * Hot module replacement snippet for local development
 * */
if (process.env.NODE_ENV === 'development' && module && module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default

    render(<NewApp />, DOM_NODE)
  })
}

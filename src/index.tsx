/* eslint-disable global-require, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires */
import React from 'react'
import { render } from 'react-dom'

import App from '@/app'

import routes from './app.routes'

const DOM_NODE: HTMLElement = document.querySelector('.appWrapper')

render(<App routes={routes} />, DOM_NODE)

async function registerSw(): Promise<void> {
  if ('serviceWorker' in navigator) {
    const { Workbox } = await import(/* webpackChunkName: 'workbox-window' */ 'workbox-window')

    const wb = new Workbox('/service-worker.js')

    wb.register()
  }
}

if (process.env.NODE_ENV === 'production') {
  registerSw()
}

/**
 * Hot module replacement snippet for local development
 * */
if (process.env.NODE_ENV !== 'production' && module && module.hot) {
  module.hot.accept('./app', () => {
    const NewApp = require('./app').default

    render(<NewApp />, DOM_NODE)
  })
}

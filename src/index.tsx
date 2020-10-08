import React from 'react'
import { render } from 'react-dom'

import App from '@/app'

import routes from './app.routes'

const DOM_NODE: HTMLElement = document.querySelector('.appWrapper')

render(<App routes={routes} />, DOM_NODE)

/**
 * Service worker register and event listeners
 */
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

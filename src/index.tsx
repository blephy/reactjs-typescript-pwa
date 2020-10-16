import React from 'react'
import { render } from 'react-dom'

import App from '@/app'

import routes from './app.routes'
import ServiceWorkerService from './services/service-worker'

const DOM_NODE: HTMLElement = document.querySelector('.appWrapper')

render(<App routes={routes} />, DOM_NODE)

if (process.env.NODE_ENV === 'production') {
  ServiceWorkerService.register()
}

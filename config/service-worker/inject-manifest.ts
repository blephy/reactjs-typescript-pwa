/* eslint-disable no-console */
import { injectManifest } from 'workbox-build'

import workboxConfig from './workbox-config'

console.log('Workbox configuration: ', workboxConfig)

injectManifest(workboxConfig).then(
  ({ count, size }) => {
    console.log(`Generated ${workboxConfig.swDest}, which will precache ${count} files (${size} bytes)`)
  },
  ({ message }) => {
    console.error('An error occured while injecting manifest in service worker.', message)
  }
)

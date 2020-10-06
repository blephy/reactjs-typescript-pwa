/* eslint-disable no-console */
import { injectManifest } from 'workbox-build'

import workboxConfig from './workbox.config'

console.info('*****************************************************')
console.info('**     Injecting manifest into service worker      **')
console.info('*****************************************************')
console.info('')
console.info('Workbox configuration: ', workboxConfig)
console.info('')

injectManifest(workboxConfig).then(
  ({ count, size }) => {
    console.info(
      `Generated ${workboxConfig.swDest}, which will precache ${count} files (${size} bytes or ${size / 1000} Ko)`
    )
  },
  ({ message }) => {
    console.error('An error occured while injecting manifest in service worker.', message)
  }
)

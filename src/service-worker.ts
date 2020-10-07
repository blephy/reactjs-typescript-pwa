/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { setCacheNameDetails } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'

import MessageTypes from './service-worker.constants'

declare const self: ServiceWorkerGlobalScope

setCacheNameDetails({
  prefix: 'reactpwa-app',
  suffix: 'v0.0.1',
  precache: 'pre-cache',
  runtime: 'runtime-cache',
  googleAnalytics: 'ga-cache'
})

/**
 * Precaching
 */
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST || [])

/**
 * Fallback to index.html on all url
 */
const defaultRouteHandler = createHandlerBoundToURL('/index.html')
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {
  // allowlist: [],
  // denylist: [],
})

registerRoute(defaultNavigationRoute)

/**
 * Specific routes strategies
 */
/**
 * NetworkFirst
 * This will try and get a request from the network first. If it receives a response, it’ll pass that to the browser
 * and also save it to a cache. If the network request fails, the last cached response will be used.
 */
/**
 * CacheFirst
 * This strategy will check the cache for a response first and use that if one is available. If the request isn’t in
 * the cache, the network will be used and any valid response will be added to the cache before being passed to the
 * browser.
 */
/**
 * stale-while-revalidate
 * This strategy will use a cached response for a request if it is available and update the cache in the background
 * with a response form the network. (If it’s not cached it will wait for the network response and use that). This
 * is a fairly safe strategy as it means users are regularly updating their cache. The downside of this strategy is
 * that it’s always requesting an asset from the network, using up the user’s bandwidth
 */
const DAY_IN_SECONDS = 24 * 60 * 60
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365

/** Scripts cache */
registerRoute(
  new RegExp('.*.js'),
  new StaleWhileRevalidate({
    cacheName: 'js-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: MONTH_IN_SECONDS
      })
    ]
  })
)
/** Stylesheets cache */
registerRoute(
  new RegExp('.*.css'),
  new StaleWhileRevalidate({
    cacheName: 'css-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: MONTH_IN_SECONDS
      })
    ]
  })
)
/** Images cache */
registerRoute(
  new RegExp('.*.(png|gif|jpg|jpeg|svg|ico)'),
  new CacheFirst({
    cacheName: 'img-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 250,
        maxAgeSeconds: MONTH_IN_SECONDS,
        purgeOnQuotaError: true
      })
    ]
  })
)
/** Fonts cache */
registerRoute(
  new RegExp('.*.(woff|woff2|ttf|eot|otf)'),
  new CacheFirst({
    cacheName: 'font-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: YEAR_IN_SECONDS,
        purgeOnQuotaError: true
      })
    ]
  })
)

self.addEventListener('message', (event: { data: { type: string } }) => {
  if (!event.data || !event.data.type) {
    return
  }

  switch (event.data.type) {
    case MessageTypes.SKIP_WAITING:
      self.skipWaiting()
      break
    case MessageTypes.CLIENTS_CLAIM:
      self.clients.claim()
      break
    default:
      break
  }
})

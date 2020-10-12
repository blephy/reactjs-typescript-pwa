import loadable from '@loadable/component'
import React from 'react'

import Loader from '@/frontend/components/loader'

const loadableOptions = {
  fallback: <Loader />
}

export const Home = loadable(
  () => import(/* webpackChunkName: 'home', webpackPreload: true */ './home'),
  loadableOptions
)

export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ './not-found'), loadableOptions)

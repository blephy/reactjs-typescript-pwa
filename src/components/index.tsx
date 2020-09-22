import loadable from '@loadable/component'

export const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPrefetch: true */ '@/components/home'))

export const Loader = loadable(() => import(/* webpackChunkName: 'loader' */ '@/components/loader'))

export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ '@/components/not-found'))

import loadable from '@loadable/component'

export const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPrefetch: true */ '@/components/home'))

export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ '@/components/not-found'))

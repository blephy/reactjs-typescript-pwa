import loadable from '@loadable/component'

export const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPreload: true */ '@/components/home'))

export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ '@/components/not-found'))

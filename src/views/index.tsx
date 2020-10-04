import loadable from '@loadable/component'

export const Home = loadable(() => import(/* webpackChunkName: 'home' */ './home'))
export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ './not-found'))

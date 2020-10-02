import loadable from '@loadable/component'

export const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPreload: true */ './home'))
export const NotFound = loadable(() => import(/* webpackChunkName: 'notFound' */ './not-found'))

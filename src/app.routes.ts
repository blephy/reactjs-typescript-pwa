import loadable from '@loadable/component'

const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPrefetch: true */ '@src/components/home/home'))

export default [
  {
    name: 'home',
    exact: true,
    path: '/',
    component: Home
  }
]

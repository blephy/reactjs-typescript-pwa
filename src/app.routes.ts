import loadable, { LoadableComponent } from '@loadable/component'

const Home = loadable(() => import(/* webpackChunkName: 'home', webpackPrefetch: true */ '@/components/home'))

export interface IRoute {
  name?: string
  exact?: boolean
  path: string
  component: React.ComponentClass | React.FunctionComponent | LoadableComponent<unknown>
}

const routes: IRoute[] = [
  {
    name: 'home',
    exact: true,
    path: '/',
    component: Home
  }
]

export default routes

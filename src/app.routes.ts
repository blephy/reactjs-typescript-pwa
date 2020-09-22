import { LoadableComponent } from '@loadable/component'

import { Home, Loader, NotFound } from '@/components'

export interface IRoute {
  name: string
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
  },
  {
    name: 'loader',
    exact: true,
    path: '/loader',
    component: Loader
  },
  {
    name: 'notFound',
    path: '*',
    component: NotFound
  }
]

export default routes

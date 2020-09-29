import { LoadableComponent } from '@loadable/component'

import { Home, NotFound } from '@/components'

export interface IRoute {
  name: string
  exact?: boolean
  path: string
  component: LoadableComponent<unknown>
}

const routes: IRoute[] = [
  {
    name: 'home',
    exact: true,
    path: '/',
    component: Home
  },
  {
    name: 'notFound',
    path: '*',
    component: NotFound
  }
]

export default routes

import React, { ReactNode } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { LoadableComponent } from '@loadable/component'
import Loader from '@components/loader/loader'

import 'normalize.css'
import '@src/styles/index.scss'

interface IProperties {
  routes: {
    name: string
    exact: boolean
    path: string
    component: React.ComponentClass | React.FunctionComponent | LoadableComponent<unknown>
  }[]
}

export default class App extends React.PureComponent<IProperties> {
  static defaultProps = {
    routes: [{}]
  }

  render(): ReactNode {
    const { routes } = this.props

    return (
      <>
        <Router>
          <Switch>
            {routes.map(({ component: Component, ...rest }) => (
              <Route
                exact={rest.exact || false}
                path={rest.path}
                key={`${rest.name}_${rest.path}`}
                render={routeProperties => <Component {...routeProperties} fallback={<Loader />} />}
              />
            ))}
          </Switch>
        </Router>
      </>
    )
  }
}

import '@/styles/index.scss'

import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ErrorBoundary from '@/components/error-boundary'
import Loader from '@/components/loader'

import { IRoute } from './app.routes'

export interface IProperties {
  routes: IRoute[]
}

export default class App extends React.PureComponent<IProperties> {
  static defaultProps = {
    routes: [{}]
  }

  render(): ReactNode {
    const { routes } = this.props

    return (
      <>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </>
    )
  }
}

// import '@/frontend/styles/index.scss'

import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import ErrorBoundary from '@/frontend/components/error-boundary'

import { IRoute } from './app.routes'

export interface IProperties {
  routes: IRoute[]
}

export default class App extends React.PureComponent<IProperties> {
  static defaultProps = {
    routes: [{}]
  }

  appTitle = 'ReactJS Progressive Web App'

  render(): ReactNode {
    const { routes } = this.props

    return (
      <>
        <ErrorBoundary>
          <Helmet defaultTitle={this.appTitle} titleTemplate={`%s | ${this.appTitle}`}>
            <link rel='canonical' href={process.env.SERVER_BASE_URL} />
          </Helmet>
          <Router>
            <Switch>
              {routes.map(({ component: Component, ...rest }) => (
                <Route
                  exact={rest.exact || false}
                  path={rest.path}
                  key={`${rest.name}_${rest.path}`}
                  render={routeProperties => <Component {...routeProperties} />}
                />
              ))}
              <Redirect to='/404' />
            </Switch>
          </Router>
        </ErrorBoundary>
      </>
    )
  }
}

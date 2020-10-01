import '@/styles/index.scss'

import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import ErrorBoundary from '@/components/error-boundary'
import Loader from '@/components/loader'
import myStructuredData from '@/database/rich-snippets/me.json'

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
          <Helmet defaultTitle={process.env.APP_TITLE} titleTemplate={`%s | ${process.env.APP_TITLE}`}>
            <script type='application/ld+json'>{JSON.stringify(myStructuredData)}</script>
          </Helmet>
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
              <Redirect to='/404' />
            </Switch>
          </Router>
        </ErrorBoundary>
      </>
    )
  }
}

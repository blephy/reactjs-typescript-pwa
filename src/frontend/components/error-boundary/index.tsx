import React from 'react'

export interface IProperties {
  children: React.ReactNode
}

export interface IState {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends React.Component<IProperties, IState> {
  static getDerivedStateFromError(error: Error): IState {
    return { hasError: true, error }
  }

  constructor(properties: IProperties) {
    super(properties)
    this.state = { hasError: false }
  }

  render(): React.ReactElement | React.ReactNode {
    const { hasError, error } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <p>{error.message}</p>
        </>
      )
    }

    return children
  }
}

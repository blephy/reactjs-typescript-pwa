import React from 'react'

export interface IProperties {
  children: React.ReactNode
}

export interface IState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<IProperties, IState> {
  constructor(properties: IProperties) {
    super(properties)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): IState {
    return { hasError: true }
  }

  render(): React.ReactElement | React.ReactNode {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <h1>Something went wrong.</h1>
    }

    return children
  }
}

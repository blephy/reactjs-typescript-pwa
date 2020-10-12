import { mount, ReactWrapper } from 'enzyme'
import React from 'react'

import ErrorBoundary, { IState } from '.'

const Something = () => {
  return <h1>Hello</h1>
}

let ErrorBoundaryComponent: ReactWrapper<unknown, IState, ErrorBoundary>

describe('ErrorBoundary when no JS errors are caught in a child component', () => {
  beforeAll(() => {
    ErrorBoundaryComponent = mount(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    )
  })

  it('should render the child component', () => {
    expect(ErrorBoundaryComponent.find(Something).exists()).toBeTruthy()
  })

  it('should have property "hasError" to false', () => {
    expect(ErrorBoundaryComponent.state()).toHaveProperty('hasError', false)
  })
})

describe('ErrorBoundary when a JS error is caught in a child component', () => {
  const errorMessage = 'Oops an error occured'

  beforeEach(() => {
    ErrorBoundaryComponent = mount(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    )
    const error = new Error(errorMessage)

    ErrorBoundaryComponent.find(Something).simulateError(error)
    ErrorBoundaryComponent.update()
  })

  it('should not render the child component', () => {
    expect(ErrorBoundaryComponent.find(Something).exists()).toBeFalsy()
  })

  it('should update the state to indicate an error', () => {
    expect(ErrorBoundaryComponent.state()).toHaveProperty('hasError', true)
  })

  it('should print the error to user', () => {
    expect(ErrorBoundaryComponent.text()).toContain(errorMessage)
  })

  it('should include an h1 element', () => {
    expect(ErrorBoundaryComponent.find('h1')).toHaveLength(1)
  })
})

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
    expect(ErrorBoundaryComponent.find(() => Something)).toBeTruthy()
  })
})

// describe('ErrorBoundary when a JS error is caught in a child component', () => {
//   beforeAll(() => {
//     ErrorBoundaryComponent = mount(
//       <ErrorBoundary>
//         <Something />
//       </ErrorBoundary>
//     )
//     const error = new Error('Oops')

//     ErrorBoundaryComponent.find(() => Something).simulateError(error)
//     ErrorBoundaryComponent.update()
//   })

//   it('should update the state to indicate an error', () => {
//     expect(ErrorBoundaryComponent.state('hasError')).toEqual(true)
//   })

//   it('should not render the child component', () => {
//     expect(ErrorBoundaryComponent.find(() => Something).exists()).toBeFalsy()
//   })
// })

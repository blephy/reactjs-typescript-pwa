import { mount, shallow } from 'enzyme'
import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import NotFound from '.'

const fakeProps = {
  match: {
    path: '/404'
  }
} as RouteComponentProps<{ path: string }>

describe('NotFound', () => {
  it('should render', () => {
    const wrapper = shallow(<NotFound {...fakeProps} />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render a title', () => {
    mount(<NotFound {...fakeProps} />)
    const helmet = Helmet.peek()

    expect(helmet.title).toEqual('404 Not found')
  })

  it('should include an h1 element', () => {
    const wrapper = shallow(<NotFound {...fakeProps} />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })
})

import { mount, shallow } from 'enzyme'
import React from 'react'
import { Helmet } from 'react-helmet'

import NotFound from '.'

describe('NotFound', () => {
  it('should render', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render a title', () => {
    mount(<NotFound />)
    const helmet = Helmet.peek()

    expect(helmet.title).toEqual('404 Not found')
  })

  it('should include an h1 element', () => {
    const wrapper = shallow(<NotFound />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })
})

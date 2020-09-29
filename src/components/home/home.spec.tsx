import { shallow } from 'enzyme'
import React from 'react'

import Home from '.'

describe('Home', () => {
  it('should render', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should include an h1 element', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })
})

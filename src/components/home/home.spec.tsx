import { shallow } from 'enzyme'
import React from 'react'

import Home from '.'

describe('Home', () => {
  it('should render', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should include a h1', () => {
    const wrapper = shallow(<Home />)
    const element = wrapper.find('h1')

    expect(element.length).toBe(1)
  })
})

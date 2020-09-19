import { shallow } from 'enzyme'
import React from 'react'

import App from './app'

describe('App', () => {
  it('should render', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.exists()).toBeTruthy()
  })
})

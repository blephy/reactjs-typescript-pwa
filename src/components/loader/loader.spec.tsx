import { shallow } from 'enzyme'
import React from 'react'

import Loader from '.'

describe('Loader', () => {
  it('should render', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper.exists()).toBeTruthy()
  })
})

import { shallow } from 'enzyme'
import React from 'react'

import NewVersionPopup from '.'

describe('NewVersionPopup', () => {
  it('should render', () => {
    const wrapper = shallow(<NewVersionPopup />)

    expect(wrapper.exists()).toBeTruthy()
  })
})

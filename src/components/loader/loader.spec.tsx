import { shallow } from 'enzyme'
import React from 'react'

import Loader from '.'
import styles from './loader.module.scss'

describe('Loader', () => {
  it('should render', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should include a styled container', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper.find(styles.loaderContainer).exists()).toBeTruthy()
  })

  it('should include a styled loader', () => {
    const wrapper = shallow(<Loader />)

    expect(wrapper.find(styles.loader).exists()).toBeTruthy()
  })
})

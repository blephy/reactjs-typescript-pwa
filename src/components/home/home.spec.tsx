import { mount, shallow } from 'enzyme'
import React from 'react'
import { Helmet } from 'react-helmet'

import Home from '.'
import styles from './home.module.scss'

describe('Home', () => {
  it('should render', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render a title', () => {
    mount(<Home />)
    const helmet = Helmet.peek()

    expect(helmet.title).toEqual('Analyst developer')
  })

  it('should include an h1 element', () => {
    const wrapper = shallow(<Home />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })

  it('should style the h1 element', () => {
    const wrapper = shallow(<Home />)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(wrapper.find(styles.title).exists).toBeTruthy()
  })
})

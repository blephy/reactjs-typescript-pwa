import { mount, shallow } from 'enzyme'
import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import Home from '.'
import styles from './home.module.scss'

const fakeProps = {
  match: {
    path: '/'
  }
} as RouteComponentProps<{ path: string }>

describe('Home', () => {
  it('should render', () => {
    const wrapper = shallow(<Home {...fakeProps} />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render a title', () => {
    mount(<Home {...fakeProps} />)
    const helmet = Helmet.peek()

    expect(helmet.title).toEqual('Home')
  })

  it('should include an h1 element', () => {
    const wrapper = shallow(<Home {...fakeProps} />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })

  it('should style the h1 element', () => {
    const wrapper = shallow(<Home {...fakeProps} />)

    expect(wrapper.find(styles.title).exists()).toBeTruthy()
  })
})

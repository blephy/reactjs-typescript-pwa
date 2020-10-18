import React from 'react'
import { Subscription } from 'rxjs'

import ServiceWorkerService from '@/frontend/services/service-worker'

interface IProperties {
  title: string
  acceptButtonContent: string
  rejectButtonContent: string
}

interface IStates {
  show: boolean
}

export default class NewVersionPopup extends React.PureComponent<IProperties, IStates> {
  /**
   * New version available subscription
   */
  private newVersionAvailableSubscription: Subscription

  /**
   * Default props
   */
  static defaultProps = {
    title: 'New version available',
    acceptButtonContent: 'Refresh',
    rejectButtonContent: 'Dismiss'
  }

  /**
   * NewVersionPopup class constructor
   * @param props Properties
   */
  constructor(props: IProperties) {
    super(props)
    this.state = {
      show: false
    }
  }

  /**
   * On component did mount
   */
  componentDidMount(): void {
    this.newVersionAvailableSubscription = ServiceWorkerService.getNewVersionAvailable().subscribe(data => {
      this.setState({ show: data })
    })
  }

  /**
   * On component will unmount
   */
  componentWillUnmount(): void {
    this.newVersionAvailableSubscription.unsubscribe()
  }

  /**
   * On new version accepted
   */
  onAccept = (): void => {
    ServiceWorkerService.sendSkipWaiting()
    ServiceWorkerService.setNewVersionAvailable(false)
  }

  /**
   * On new version rejected
   */
  onReject = (): void => {
    ServiceWorkerService.setNewVersionAvailable(false)
  }

  render(): JSX.Element {
    const { acceptButtonContent, rejectButtonContent, title } = this.props
    const { show } = this.state

    if (show) {
      return (
        <>
          <h4>{title}</h4>
          <button onClick={this.onAccept} type='button'>
            {acceptButtonContent}
          </button>
          <button onClick={this.onReject} type='button'>
            {rejectButtonContent}
          </button>
        </>
      )
    }
    return <></>
  }
}

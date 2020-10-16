import { BehaviorSubject, Observable } from 'rxjs'
import { share } from 'rxjs/operators'

import { MessageTypes } from '@/service-worker/service-worker.constants'

export default class ServiceWorkerService {
  /**
   * Service worker registration
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private static registration: BehaviorSubject<ServiceWorkerRegistration | undefined> = new BehaviorSubject(undefined)

  /**
   * Is new service-worker version available
   */
  private static newVersionAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false)

  /**
   * Message service worker utils
   */
  private static messageSW: (sw: ServiceWorker, data: Record<string, unknown>) => Promise<Record<string, unknown>>

  /**
   * Get service worker registration
   */
  public static getRegistration(): Observable<ServiceWorkerRegistration> {
    return this.registration.asObservable().pipe(share())
  }

  /**
   * Set service worker registration
   */
  public static setRegistration(registration: ServiceWorkerRegistration): void {
    this.registration.next(registration)
  }

  /**
   * Get new service-worker version available
   */
  public static getNewVersionAvailable(): Observable<boolean> {
    return this.newVersionAvailable.asObservable().pipe(share())
  }

  /**
   * Set new service-worker versin available
   * @param value Value to set
   */
  public static setNewVersionAvailable(value: boolean): void {
    this.newVersionAvailable.next(value)
  }

  /**
   * Send skip waiting message to service worker
   */
  public static sendSkipWaiting(): void {
    const registration = this.registration.getValue()

    if (registration && registration.waiting) {
      this.messageSW(registration.waiting, { type: MessageTypes.SKIP_WAITING })
    }
  }

  /**
   * Register service worker
   */
  public static async register(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const { Workbox, messageSW } = await import(/* webpackChunkName: 'workbox-window' */ 'workbox-window')
      const wb = new Workbox('/service-worker.js')

      this.messageSW = messageSW

      wb.addEventListener('waiting', () => {
        this.setNewVersionAvailable(true)
      })

      wb.addEventListener('controlling', () => {
        window.location.reload()
      })

      wb.register().then(r => {
        this.setRegistration(r)
      })
    }
  }
}

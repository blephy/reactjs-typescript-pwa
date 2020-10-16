import ServiceWorkerService from './service-worker'

describe('ServiceWorkerService', () => {
  it('Should have a registration initial state to undefined', done => {
    ServiceWorkerService.getRegistration().subscribe(registration => {
      expect(registration).toBeUndefined()
      done()
    })
  })
  it('Can set a registration value', done => {
    const registration = {} as ServiceWorkerRegistration

    ServiceWorkerService.setRegistration(registration)
    ServiceWorkerService.getRegistration().subscribe(r => {
      expect(r).toBeDefined()
      done()
    })
  })
  it('Should have a newAvailableVersion initial state to false', done => {
    ServiceWorkerService.getNewVersionAvailable().subscribe(data => {
      expect(data).toBe(false)
      done()
    })
  })
  it('Can set a newAvailableVersion value to true', done => {
    ServiceWorkerService.setNewVersionAvailable(true)
    ServiceWorkerService.getNewVersionAvailable().subscribe(data => {
      expect(data).toBe(true)
      done()
    })
  })
})

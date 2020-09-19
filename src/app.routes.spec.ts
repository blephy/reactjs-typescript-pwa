import appRoutes from './app.routes'

describe('Application routes', () => {
  it('should be defined', () => {
    expect(appRoutes).toBeDefined()
  })

  it('should be an array', () => {
    expect(Array.isArray(appRoutes)).toBeTruthy()
  })

  it('should have at least one item', () => {
    expect(appRoutes.length).toBeGreaterThan(0)
  })

  it('should have path property in items', () => {
    appRoutes.forEach(route => {
      expect(route).toHaveProperty('path')
    })
  })

  it('should have component property in items', () => {
    appRoutes.forEach(route => {
      expect(route).toHaveProperty('component')
    })
  })

  it('should have at least one item with root path', () => {
    const array = appRoutes.map(route => {
      return route.path === '/'
    })

    expect(array).toContain(true)
  })
})

import appRoutes from './app.routes'

describe('Application routes', () => {
  it('should be defined', () => {
    expect(appRoutes).toBeDefined()
  })

  it('should be an array', () => {
    expect(Array.isArray(appRoutes)).toBeTruthy()
  })

  it('should have at least two items', () => {
    expect(appRoutes.length).toBeGreaterThan(1)
  })

  it('should have "component" property in each item', () => {
    appRoutes.forEach(route => {
      expect(route).toHaveProperty('component')
    })
  })

  it('should have "path" property in each item', () => {
    appRoutes.forEach(route => {
      expect(route).toHaveProperty('path')
    })
  })

  it('should have "name" property in each item', () => {
    appRoutes.forEach(route => {
      expect(route).toHaveProperty('name')
    })
  })

  it('should have at least one item with root path', () => {
    const array = appRoutes.map(route => {
      return route.path === '/'
    })

    expect(array).toContain(true)
  })

  it('should have at least one item for 404 page', () => {
    const array = appRoutes.map(route => {
      const { path } = route

      return path === '*' || path === '/404'
    })

    expect(array).toContain(true)
  })
})

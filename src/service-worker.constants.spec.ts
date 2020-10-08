import MessageTypes from './service-worker.constants'

describe('MessageTypes', () => {
  it('should have a SKIP_WAITING value', () => {
    expect(MessageTypes).toHaveProperty('SKIP_WAITING')
  })
  it('should have a CLIENTS_CLAIM value', () => {
    expect(MessageTypes).toHaveProperty('CLIENTS_CLAIM')
  })
  it('should have a CACHE_UPDATED value', () => {
    expect(MessageTypes).toHaveProperty('CACHE_UPDATED')
  })
})

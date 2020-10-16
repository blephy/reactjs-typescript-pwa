import { EventTypes, MessageTypes } from './service-worker.constants'

describe('MessageTypes', () => {
  it('should have a SKIP_WAITING property', () => {
    expect(MessageTypes).toHaveProperty('SKIP_WAITING')
  })
  it('should have a CLIENTS_CLAIM property', () => {
    expect(MessageTypes).toHaveProperty('CLIENTS_CLAIM')
  })
  it('should have a CACHE_UPDATED property', () => {
    expect(MessageTypes).toHaveProperty('CACHE_UPDATED')
  })
})

describe('EventTypes', () => {
  it('should have a INSTALLED property', () => {
    expect(EventTypes).toHaveProperty('INSTALLED')
  })
  it('should have a WAITING property', () => {
    expect(EventTypes).toHaveProperty('WAITING')
  })
  it('should have a ACTIVATED property', () => {
    expect(EventTypes).toHaveProperty('ACTIVATED')
  })
  it('should have a CONTROLLING property', () => {
    expect(EventTypes).toHaveProperty('CONTROLLING')
  })
  it('should have a MESSAGE property', () => {
    expect(EventTypes).toHaveProperty('MESSAGE')
  })
})

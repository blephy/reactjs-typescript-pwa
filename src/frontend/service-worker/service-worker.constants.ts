export const MessageTypes = {
  /**
   * Skip waiting data type
   */
  SKIP_WAITING: 'SKIP_WAITING',
  /**
   * Clients claim data type
   */
  CLIENTS_CLAIM: 'CLIENTS_CLAIM',
  /**
   * Cache updated data type
   */
  CACHE_UPDATED: 'CACHE_UPDATED'
}

export const EventTypes = {
  /**
   * Trigger when service worker is installed
   */
  INSTALLED: 'installed',
  /**
   * Triggered when service worker is waiting
   */
  WAITING: 'waiting',
  /**
   * Triggered when service worker is activated
   */
  ACTIVATED: 'activated',
  /**
   * Triggered when service worker is controlling
   */
  CONTROLLING: 'controlling',
  /**
   * Triggered when service worker has send a message
   */
  MESSAGE: 'message'
}

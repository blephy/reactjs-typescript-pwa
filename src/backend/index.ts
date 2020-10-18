/* eslint-disable no-console */
import server from './server'

/**
 * Server start
 */
server.listen(server.get('port'), () => {
  console.log('Listening on port:', server.get('port'))
  console.log('Environment:', server.get('env'))
})

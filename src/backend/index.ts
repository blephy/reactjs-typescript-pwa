import logger from './logger'
import server from './server'

/**
 * Server start
 */
server.listen(server.get('port'), () => {
  logger.info(`Listening on port: ${server.get('port') as string}`)
  logger.info(`Environment: ${server.get('env') as string}`)
})

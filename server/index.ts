const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')

/**
 * Instance configuration. Needed by express
 */
const InstanceDistPathToServe = path.resolve(__dirname, '../build')
const InstancePortToListen = process.env.PORT || '3001'
const staticExpressOption = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html'],
  index: 'index.html',
  maxAge: '0',
  lastModified: false,
  redirect: true
}
const corsOptions = {
  origin: '*'
}

/**
 * Init production server
 */
function initServer() {
  const server = express()

  server.use(
    bodyParser.json({
      type: ['json', 'application/csp-report']
    })
  )
  server.use(compression())
  server.use(helmet())
  server.use(cors(corsOptions))
  server.use(helmet.referrerPolicy({ policy: 'same-origin' }))
  /**
   * Service static files
   */
  server.use(express.static(InstanceDistPathToServe, staticExpressOption))

  /**
   * Fall history for SPA
   */
  server.use(
    fallback('index.html', {
      root: InstanceDistPathToServe,
      lastModified: staticExpressOption.lastModified,
      maxAge: staticExpressOption.maxAge,
      dotfiles: staticExpressOption.dotfiles
    })
  )

  /**
   * Routes
   */
  server.options('*', cors())

  /**
   * Server start
   */
  server.listen(InstancePortToListen, () => {
    console.log('Node server initiated')
  })
}

initServer()

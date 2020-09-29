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
  origin: 'https://allandolle.fr',
  optionsSuccessStatus: 200
}

/**
 * Init production server
 */
function initServer() {
  const server = express()

  server.use(
    bodyParser.json({
      type: ['json']
    })
  )

  /** Set compression */
  server.use(compression())

  /** Set cors */
  server.use(cors(corsOptions))

  /**
   * Set security
   */
  server.use(helmet.ieNoOpen())
  server.use(helmet.noSniff())
  server.use(helmet.hidePoweredBy())
  server.use(helmet.xssFilter())
  server.use(helmet.referrerPolicy({ policy: 'same-origin' }))
  server.use(
    helmet.expectCt({
      reportUri: 'https://allandolle.report-uri.com/r/d/ct/enforce',
      maxAge: 86400,
      enforce: true
    })
  )
  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'https:', 'allandolle.fr', 'locahost'],
        frameAncestors: "'none'",
        reportUri: ['https://allandolle.report-uri.com/r/d/csp/enforce'],
        reportTo: ['https://allandolle.report-uri.com/r/d/csp/enforce'],
        upgradeInsecureRequests: '',
        blockAllMixedContent: ''
      }
    })
  )
  server.use(
    helmet.dnsPrefetchControl({
      allow: true
    })
  )
  server.use(
    helmet.frameguard({
      action: 'deny'
    })
  )
  server.use(
    helmet.permittedCrossDomainPolicies({
      permittedPolicies: 'none'
    })
  )
  server.use(
    helmet.hsts({
      maxAge: 15552000,
      includeSubDomains: true,
      preload: true
    })
  )
  /** Permission policy */
  server.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=(), fullscreen=(self)')
    next()
  })

  /**
   * Service static files
   */
  server.use(express.static(InstanceDistPathToServe, staticExpressOption))

  /**
   * Fallback history for SPA
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
   * Permit preflight request
   */
  server.options('*', cors())

  /**
   * Server start
   */
  server.listen(InstancePortToListen, () => {
    console.log('Listening on port:', InstancePortToListen)
  })
}

initServer()

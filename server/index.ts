const path = require('path')
const express = require('express')
const fallback = require('express-history-api-fallback')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const hpp = require('hpp')
require('dotenv').config()

/**
 * Instance configuration. Needed by express
 */
const InstanceDistPathToServe = path.resolve(__dirname, '../build')
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
  origin: JSON.parse(process.env.HTTPS) ? `https://${process.env.DOMAIN_NAME}` : `http://${process.env.DOMAIN_NAME}`,
  optionsSuccessStatus: 200
}

/**
 * Init production server
 */
function initServer() {
  const server = express()

  server.use(
    bodyParser.json({
      type: ['application/json']
    })
  )

  /** Set HTTP parameter pollution */
  server.use(hpp())

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
      reportUri: process.env.CT_REPORT_URI,
      maxAge: 86400,
      enforce: true
    })
  )
  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", 'https:', process.env.DOMAIN_NAME],
        fontSrc: ["'self'", 'data:'],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'", 'https:', 'wss:', process.env.API_URL],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        frameAncestors: ["'none'"],
        reportUri: [process.env.CSP_REPORT_URI],
        reportTo: [process.env.CSP_REPORT_URI],
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
  server.listen(process.env.PORT, () => {
    console.log('Listening on port:', process.env.PORT)
  })
}

initServer()

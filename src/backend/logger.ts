import path from 'path'
import winston from 'winston'

const timezoned = new Date().toLocaleString('fr-FR', {
  timeZone: 'Europe/Paris'
})

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, 'server.log'),
      handleExceptions: true,
      level: 'debug'
    }),
    new winston.transports.File({
      filename: path.resolve(__dirname, 'server-errors.log'),
      handleExceptions: true,
      level: 'error'
    })
  ],
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: timezoned
    }),
    winston.format.printf((info: Record<string, string>) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  exitOnError: false
}

const logger = winston.createLogger(options)

export default logger

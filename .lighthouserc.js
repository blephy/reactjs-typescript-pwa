module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      url: ['http://localhost:3001/', 'http://localhost:3001/404'],
      startServerCommand: 'npm run start:prod',
      startServerReadyPattern: 'Listening on port:'
    },
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'maskable-icon': 'warn',
        'maskable-icon-audit': 'warn',
        'non-composited-animations': 'warn'
      }
    }
  }
}

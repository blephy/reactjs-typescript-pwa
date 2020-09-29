module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3001/'],
      startServerCommand: 'npm run start:prod'
    },
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'robots-txt': 'off'
      }
    }
  }
}

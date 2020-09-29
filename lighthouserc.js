module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3001/'],
      startServerCommand: 'npm run start:prod'
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'uses-rel-preload': 'off',
        'uses-rel-preconnect': 'off',
        'render-blocking-resources': 'off',
        'robots-txt': 'off'
      }
    }
  }
}

module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3001/'],
      startServerCommand: 'npm run start:prod'
    },
    assert: {
      preset: 'lighthouse:recommended'
    }
  }
}

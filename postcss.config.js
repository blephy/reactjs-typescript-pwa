module.exports = {
  parser: 'postcss-scss',
  map: true,
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        stage: 3,
        autoprefixer: {
          grid: true,
          flexbox: true,
          supports: true,
          remove: true,
          add: true,
          cascade: true
        },
        features: {
          'nesting-rules': true
        }
      }
    ]
  ]
}

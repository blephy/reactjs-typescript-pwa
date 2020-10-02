module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        ignoreBrowserslistConfig: false,
        useBuiltIns: 'usage',
        corejs: 3,
        modules: 'auto',
        bugfixes: true
      }
    ],
    [
      '@babel/preset-react',
      {
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment',
        throwIfNamespace: true
      }
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowDeclareFields: true
      }
    ]
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
}

module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => [
    'npm run ts:check',
    `eslint --fix ${filenames.join(' ')}`,
    `stylelint --fix ${filenames.join(' ')}`
  ],
  '*.{css,scss,less,sass,html}': ['stylelint --fix'],
  '*.md': ['markdownlint --fix'],
  '*': 'prettier --write --ignore-unknown'
}

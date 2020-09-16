module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => [
    'npm run typescript:check',
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`
  ],
  '*.{css,scss,sass,js,jsx,ts,tsx,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['markdownlint --fix', 'prettier --write']
}

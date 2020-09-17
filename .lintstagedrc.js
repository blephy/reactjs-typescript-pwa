module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => [
    'npm run typescript:check',
    `eslint --fix ${filenames.join(' ')}`,
    `stylelint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`
  ],
  '*.{css,scss,less,sass,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['markdownlint --fix', 'prettier --write'],
  '*.{yaml,yml,graphql,json}': 'prettier --write'
}

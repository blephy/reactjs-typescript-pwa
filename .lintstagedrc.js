module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => [
    'tsc -p tsconfig.json --noEmit',
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`
  ],
  '*.{css,scss,sass,js,jsx,ts,tsx,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['markdownlint --fix', 'prettier --write']
}

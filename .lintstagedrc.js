module.exports = {
  '*.{js,jsx,ts,tsx}': filenames => [
    'npm run ts:check',
    `eslint --fix ${filenames.join(' ')}`,
    `stylelint --fix ${filenames.join(' ')}`
  ],
  '*.{css,scss,less,sass}': ['stylelint --fix'],
  '*.{html,ejs}': ['stylelint --fix', 'htmlhint --config .htmlhintrc --ignore node_modules/'],
  '*.md': ['markdownlint --fix'],
  '*': 'prettier --write --ignore-unknown'
}

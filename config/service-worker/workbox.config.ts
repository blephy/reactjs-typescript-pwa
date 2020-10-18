const config = {
  globDirectory: 'build/frontend/',
  globPatterns: [
    '**/*.{html,css,js,mjs}',
    '**/*.{json,xml}',
    '**/*.{woff,woff2,eot,ttf,otf}',
    '**/*.{webp,ico,jpg,jpeg,png,svg,gif,txt,webmanifest,webm}'
  ],
  globFollow: true,
  globStrict: true,
  globIgnores: ['humans.txt', 'robots.txt', '.well-known/*'],
  maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
  swSrc: 'build/frontend/service-worker.js',
  swDest: 'build/frontend/service-worker.js'
}

export default config

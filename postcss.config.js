module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-combine-media-query'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}

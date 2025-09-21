module.exports = function (api) {
  api.cache(true)
  return {
    plugins: ['macros'],
    presets: [
      "@babel/preset-env",
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
  }
}

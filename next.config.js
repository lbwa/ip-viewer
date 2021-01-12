module.exports = {
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://cdn.jsdelivr.net/gh/lbwa/ip-viewer@gh-pages/'
      : '',
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/j-nuts-memory/'
    : '/',
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // template title <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'J🌰 Memory'
    }
  },
  pwa: {
    name: 'J🌰 Memory',
    themeColor: '#28a745',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
    }


  }
}

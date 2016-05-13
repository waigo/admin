path = require 'path'
buildBrowserifyJs = require './utils/build-browserify-js'


module.exports = (paths, options = {}) ->
  handler: ->
    buildBrowserifyJs
      srcGlob: path.join(paths.frontend.src, 'js', 'app.js')
      outputName: 'admin.js'
      outputDir: path.join(paths.frontend.build, 'js')
      paths: paths
      options: options

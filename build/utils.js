var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    // css: generateLoaders(),
    postcss: generateLoaders(),
    // less: generateLoaders('less'),
    // sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss: generateLoaders('sass'),
    // stylus: generateLoaders('stylus'),
    // styl: generateLoaders('stylus')
  }
}

exports.specificCSSRules = function (options) {
  options = options || {}
  function getRule(loader,includePath,excludePath) {
    return {
      test: new RegExp('\\.css$'),
      use: loader,
      include: path.resolve(__dirname, includePath),
      exclude: path.resolve(__dirname, excludePath)
    }
  }

  function getLoader(options, module) {
    var loader = {
      loader: 'css-loader',
      options: {
        minimize: process.env.NODE_ENV === 'production',
        sourceMap: options.sourceMap,
      }
    }
    if (module) Object.assign(loader.options, {
      modules: true,
      camelCase: true,
      localIdentName: '[path][name]-[local]-[hash:base64:4]'
    });
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: [loader],
        fallback: 'vue-style-loader'
      })
    }else{
      return ['vue-style-loader'].concat([loader])
    }
  }
  var normalLoader = getLoader(options);
  var moduleLoader = getLoader(options,true);
  var normalRule = getRule(normalLoader,'../node_modules','../src');
  var moduleRule = getRule(moduleLoader,'../src','../node_modules');
  return [normalRule,moduleRule];
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  var specialRules = exports.specificCSSRules(options);
  output = output.concat(specialRules);
  return output;
}

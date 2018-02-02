const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

const extractLESS = new ExtractTextPlugin('[name].css');

const path = require('path');

const ModernizrConfig = {
    "filename" : "modernizr.bundle.js",
    "classPrefix": "",
    "options": [
      "domPrefixes",
      "html5shiv",
      "prefixedCSS",
      "setClasses"
    ],
    "feature-detects": [
      "forms/placeholder",
      "touchevents",
      "css/transforms3d",
      "css/transforms"
    ]
  };
module.exports = {
    
    entry: {
        styles: './styles/components',
        server: './scripts/server',
        hi: `webpack-polyfill-injector?${JSON.stringify({
            modules: ["./components/Hi/Hi"] // list your entry modules for the `app` entry chunk
        })}!`, // don't forget the trailing exclamation mark!
        hello: `webpack-polyfill-injector?${JSON.stringify({
            modules: ["./components/Hello/Hello"] // list your entry modules for the `app` entry chunk
        })}!` // don't forget the trailing exclamation mark!

    },
    output: {
        path: path.join(__dirname, 'wwwroot/build'),
        filename: '[name].bundle.js'
    },
    
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.jsx$/, loader: 'expose-loader?Components!jsx-loader?harmony' },
            // {
            //     test: /\.less$/i,
            //     use: extractLESS.extract([  'css-loader', 'less-loader' ])
            // },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
       
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".jsx", ".js", ".json"]
    },


    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new PolyfillInjectorPlugin({
            polyfills: [
                'Promise'
            ]
        }),
        extractLESS,
        new ModernizrWebpackPlugin(ModernizrConfig)
    ]
};
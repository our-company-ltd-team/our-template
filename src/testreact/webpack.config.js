const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const path = require('path');

const merge = require('webpack-merge');





module.exports = (env) => {
    const isDevBuild = !(env && (env.prod || env.production));
    const envPath = isDevBuild ? `development` : `production`;

    const ModernizrConfig = {
        "minify": !isDevBuild,
        "filename": "modernizr.bundle.js",
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

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        // Enable sourcemaps for debugging webpack's output.
        devtool: isDevBuild ? "source-map" : "none",
        watch: true,
        module: {
            rules: [
                { test: /\.jsx$/, loader: 'expose-loader?Components!jsx-loader?harmony' }
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
        ].concat(isDevBuild ? [
        ] : [
                new UglifyJsPlugin()
            ])

    });

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = `./wwwroot/build/${envPath}`;

    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            index: './scripts/index',
            hi: './components/Hi/Hi',
            hello: './components/Hello/Hello'
        },

        module: {
            rules: [
                {
                    test: /\.css$/, use: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader", options: {
                                minimize: !isDevBuild,
                                sourceMap: isDevBuild
                            }
                        }]
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader", options: {
                                minimize: !isDevBuild,
                                sourceMap: isDevBuild
                            }
                        }, {
                            loader: "less-loader", options: {
                                sourceMap: isDevBuild
                            }
                        }]
                    })
                }, // use ! to chain loaders
                {
                    test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
                } // inline base64 URLs for <=8k images, direct URLs for the rest
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir),
            filename: '[name].bundle.js'
        },
        plugins: [
            new ExtractTextPlugin("[name].bundle.css"),
            new ModernizrWebpackPlugin(ModernizrConfig)
        ]
    });

    const stylesBundleConfig = merge(sharedConfig(), {

        entry: {
            common: './styles/common',
        },

        module: {
            rules: [
                {
                    test: /\.css$/, use: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader", options: {
                                minimize: !isDevBuild,
                                sourceMap: isDevBuild
                            }
                        }]
                    })
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        use: [{
                            loader: "css-loader", options: {
                                minimize: !isDevBuild,
                                sourceMap: isDevBuild
                            }
                        }, {
                            loader: "less-loader", options: {
                                sourceMap: isDevBuild
                            }
                        }]
                    })
                },
                {
                    test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
                } // inline base64 URLs for <=8k images, direct URLs for the rest
            ]
        },
        output: {
            path: path.join(__dirname, clientBundleOutputDir),
            filename: '[name].bundle.css'
        },
        plugins: [
            new ExtractTextPlugin('[name].bundle.css')
        ].concat(isDevBuild ? [
            // // Plugins that apply in development builds only
            // new webpack.SourceMapDevToolPlugin({
            //     filename: '[file].map', // Remove this line if you prefer inline source maps
            //     moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            // })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleOutputDir = './scripts/dist';
    const serverBundleConfig = merge(sharedConfig(), {
        // resolve: { mainFields: ['main'] },
        entry: {
            server: './scripts/server',
        },

        output: {
            path: path.join(__dirname, serverBundleOutputDir),
            filename: '[name].bundle.js'
        },
        module: {
            rules: [
                { test: /\.less$/, loader: 'ignore-loader' }
            ]
        },
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, stylesBundleConfig, serverBundleConfig];

};
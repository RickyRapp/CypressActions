'use strict';

const path = require('path');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const glob = require('glob');
const paths = require('./paths');
const helpers = require('./helpers');

function getApplicationSettings(settings) {
    var availableLanguages = [];
    helpers.scanSync('./public/locales', { directory: true }, function (item, stat) {
        const [directoryName] = item.split(path.sep).slice(-1);
        availableLanguages.push(directoryName);
    });

    settings.availableLanguages = availableLanguages;
    return JSON.stringify(settings);
}

const ApplicationSettings = getApplicationSettings(require(paths.appSettings));

const themeName = process.env.npm_config_theme || 'default';
const alias = {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    'themes': paths.appSrc + '/themes/' + themeName,
    'core': paths.appSrc + '/core',
    'agency': paths.appSrc + '/agency/modules'
};

// This is the common configuration.
module.exports = function (options) {
    options = options || {};

    // Get environment variables to inject into our app.
    const env = options.env || getClientEnvironment('');

    return {
        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        // The first two entry points enable "hot" CSS and auto-refreshes for JS.
        entry: {
            // We ship a few polyfills by default:
            polyfills: require.resolve('./polyfills'),
            // Finally, this is your app's code:
            commonModules: glob.sync("./src/config.js", { ignore: ['./src/agency/**/config.js'] }),
            appModules: glob.sync("./src/modules/**/config.js"),
            app: paths.appIndexJs,
            // We include the app code last so that if there is a runtime error during
            // initialization, it doesn't blow up the WebpackDevServer client, and
            // changing JS code would still trigger a refresh.
        },
        resolve: {
            // This allows you to set a fallback for where Webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebookincubator/create-react-app/issues/253
            modules: ['node_modules', paths.appNodeModules].concat(
                // It is guaranteed to exist because we tweak it in `env.js`
                process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
            ),
            // These are the reasonable defaults supported by the Node ecosystem.
            // We also include JSX as a common component filename extension to support
            // some tools, although we do not recommend using it, see:
            // https://github.com/facebookincubator/create-react-app/issues/290
            // `web` extension prefixes have been added for better support
            // for React Native Web.
            extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
            alias: alias,
            plugins: [
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ]
        },
        module: {
            strictExportPresence: true,
            rules: [
                // TODO: Disable require.ensure as it's not a standard language feature.
                // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
                // { parser: { requireEnsure: false } },

                // First, run the linter.
                // It's important to do this before Babel processes the JS.
                {
                    test: /\.(js|jsx|mjs)$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: eslintFormatter,
                                eslintPath: require.resolve('eslint'),
                                emitWarning: true,
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    // "oneOf" will traverse all following loaders until one will
                    // match the requirements. When no loader matches it will fall
                    // back to the "file" loader at the end of the loader list.
                    oneOf: [
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                        // Process JS with Babel.
                        {
                            test: /\.(js|jsx|mjs)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {

                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                plugins: ['lodash'],
                                presets: [['env', { 'targets': { 'node': 6 } }]]
                            }
                        },
                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.css$/],
                            loader: require.resolve('file-loader'),
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
                // ** STOP ** Are you adding a new loader?
                // Make sure to add the new loader(s) before the "file" loader.
            ]
        },
        plugins: [
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In development, this will be an empty string.
            new InterpolateHtmlPlugin(env.raw),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
            new webpack.DefinePlugin(env.stringified),
            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: 3,
                chunks: ['polyfills', 'hotDevClient', 'commonModules', 'appModules', 'app']
            }),
            new webpack.DefinePlugin({
                Environment: JSON.stringify({
                    debug: process.env.NODE_ENV !== 'production'
                }),
                ApplicationSettings: ApplicationSettings
            })
        ],
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
  };
}
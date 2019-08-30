var paths = require('./config/paths');

module.exports = {
    plugins: [
        require('postcss-import')({ path: [paths.appSrc] }),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('postcss-custom-media'),
        require('postcss-color-function'),
        require('postcss-inline-svg'),
        require('postcss-svgo'),
        require('postcss-calc'),
        require('postcss-pxtorem'),
        require('autoprefixer')({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        })
    ],
};

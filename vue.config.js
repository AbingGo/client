const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    devServer: {
        proxy: {
            '/apiproxy/xxxx': {
                target: 'http://xxxxxxx.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/apiproxy/xxxxxx': '',
                },
                headers: {
                    cookie: '',
                }
            }
        },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import '@/assets/css/commons/var.scss';
                `,
            },
        },
    },
    configureWebpack: (config) => {
        if (debug) {
            config.devtool = 'cheap-module-eval-source-map';
        }
    }
};

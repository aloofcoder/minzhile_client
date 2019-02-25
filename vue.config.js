module.exports = {
    devServer: {
        proxy: {
            '/minzhile': {
                target: 'http://127.0.0.1:8099',
                changeOrigin: true
            }
        }
    }
}

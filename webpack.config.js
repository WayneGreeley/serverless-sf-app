const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    // Generate sourcemaps for proper error messages
    devtool: 'source-map',
    // Since 'aws-sdk' is not compatible with webpack,
    // we exclude all node dependencies
    externals: [nodeExternals()],
    optimization: {
        minimize: false, // in production is defaultValue is True
    },
    performance: {
      // Turn off size warnings for entry points
        hints: false,
    }
};
'use strict';

let webpackConfig = require('./webpack.config');
webpackConfig = {
  devtool: 'inline-source-map',
  module: webpackConfig.module
};

let customLaunchers = {},
    browsers = ['Chrome'],
    autoWatch = true,
    reporters = ['logcapture', 'super-dots', 'mocha'];

if (process.env.NODE_ENV === 'ci') {
  customLaunchers = {
    sl_chrome_win7: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7'
    },
    sl_firefox_win7: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 7'
    },
    sl_ie11_win7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11',
      platform: 'Windows 7'
    },
    sl_ie10_win7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10',
      platform: 'Windows 7'
    },
    sl_ie9_win7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9',
      platform: 'Windows 7'
    },
    /*sl_ie8_win7: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '8',
      platform: 'Windows 7'
    },*/
    sl_edge_win10: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10'
    }
  };
  browsers = Object.keys(customLaunchers);
  autoWatch = false;
  reporters = ['progress', 'saucelabs'];
}


module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test.js'],
    exclude: [],
    preprocessors: {
      'test.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters,
    mochaReporter: {
      output: 'minimal'
    },
    sauceLabs: {
      testName: 'Karma Tests',
      build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch,
    customLaunchers,
    browsers,
    singleRun: true,
    concurrency: Infinity,
    captureTimeout: 120000,
    browserNoActivityTimeout: 30000
  })
};

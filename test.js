require('angular');
require('angular-mocks');

var testsContext = require.context("./test", true, /\.js/);
testsContext.keys().forEach(testsContext);
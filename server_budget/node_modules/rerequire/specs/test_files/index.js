var http = require('http');
var mod = require('./mod');

var test_files = {
  http: http,
  mod: mod,
  date: Date,
};

module.exports = test_files;

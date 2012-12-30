/*
 * index.js: Top-level include for tests helpers.
 *
 * (C) 2012, Nodejitsu Inc.
 *
 */

var fs = require('fs'),
    path = require('path');

//
// Expose the root directory.
//
var testRoot = path.join(__dirname, '..'),
    port = 10556;

//
// ### @dirs {Object}
// Paths to all test directories
//
var dirs = exports.dirs = fs.readdirSync(testRoot)
  .reduce(function (all, dir) {
    all[dir] = path.join(testRoot, dir);
    return all;
  }, {});

//
// ### @fixtures {Object}
// Fully parsed set of test fixtures
//
var fixtures = exports.fixtures = fs.readdirSync(dirs.fixtures)
  .reduce(function (all, file) {
    file = file.replace('.json', '');
    all[file] = require(path.join(dirs.fixtures, file));
    return all;
  }, {});

//
// ### @nextPort {number}
// Next available port for testing.
//
Object.defineProperty(exports, 'nextPort', {
  get: function () {
    return ++port;
  }
});

//
// Expose module specific helpers
//
exports.net     = require('./net');
exports.reactor = require('./reactor');
'use strict';

var grunt = require('grunt');
var RegexCheck = require('../tasks/lib/regex-check');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var helper = {
    stubbedLogger: function () {
        var captured, error;

        return {
            writeln: function (message) {
                captured = message;
            },
            getCaptured: function () {
                return captured;
            },
            error: function (errorMessage) {
                error = errorMessage;
            },
            getError: function () {
                return errro;
            }
        }
    },
    stubbedFile: function () {
        return {
            exists: function (file) {

            },
            read: function (file) {

            }
        }
    }

};

exports.regex_check = {

  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
      var log = helper.stubbedLogger();
      var file = helper.stubbedFile();
      var pattern = /console/g;
      var excluded = [];
      var regexCheck = new RegexCheck(pattern, excluded, log, file);


//      console.log(grunt.file);
//      files: ["test/fixtures/**/*.js"],
//          options: {
//          excluded : ["src/**/*xcluded.js", 'src2/shouldBeExcluded.js'],
//              pattern : /console/g
//      }

    test.done();
  }
};

var should = require("should");

describe("Something with mohca", function() {
    it("should do something", function() {
        var expected = -1;
        [1,2,3].indexOf(5).should.equal(expected);
    });
});

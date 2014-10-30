'use strict';

var grunt = require('grunt');
var RegexCheck = require('../tasks/lib/regex-check');
var utils = require('../tasks/lib/utils');
var assert = require('assert')
var sinon = require ('sinon');

describe("regex-check", function() {
    describe("initialisation", function() {
        it("should fail if no pattern present", sinon.test(function() {
            (function() {
                new RegexCheck(undefined, [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));

        it("should fail if empty array pattern present", sinon.test(function() {
            (function() {
                new RegexCheck([], [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));

        it("should fail if string in array as pattern", sinon.test(function() {
            (function() {
                new RegexCheck([/aPattern/g,/aPattern/g,'failRegex'], [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));

        it("should fail if pattern looks like a string", sinon.test(function() {
            (function() {
                new RegexCheck("invalidRegularExpresssion", [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));


        it("should not error if excluded is undefined", sinon.test(function() {
            var regexCheck = new RegexCheck(/aPattern/g, undefined, this.stub(grunt.log), this.stub(grunt.file));
            regexCheck.check([]);
        }));

        it("should warn if no files were processed", sinon.test(function() {
            var log = this.stub(grunt.log);

            var regexCheck = new RegexCheck(/aPattern/g, undefined, log, this.stub(grunt.file));
            regexCheck.check([]);

            log.warn.called.should.be.true;
        }));

        it("should match for a pattern", sinon.test(function() {
            var fileResult = utils.fileContentChecker([/text/g], "text content", "filepath", []);
            assert.equal(fileResult.matches.length, 1);
        }));

        it("should match for several patterns", sinon.test(function() {
            var fileResult = utils.fileContentChecker([/text/g,/content/g], "text content", "filepath", []);
            assert.equal(fileResult.matches.length, 2);
        }));


        it("should not always match for several patterns", sinon.test(function() {
            var fileResult = utils.fileContentChecker([/text/g,/contentaaaaa/g], "text content", "filepath", []);
            assert.equal(fileResult.matches.length, 1);
        }));

        it("should not match excluded file", sinon.test(function() {
            var fileResult = utils.fileContentChecker([/text/g,/contentaaaaa/g], "text content", "filepath", ["filepath"]);
            assert.equal(fileResult.matches.length,0);
        }));

    });
});
